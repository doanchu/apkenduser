package handlers

import "net/http"
import "github.com/gorilla/mux"
import "encoding/json"
import "strconv"
import "log"
import "github.com/doanchu/apkenduser/models"

func AppPartnerHandler(w http.ResponseWriter, r *http.Request) {
	var err error
	vars := mux.Vars(r)
	myPartner := vars["partner"]
	page, err := strconv.Atoi(vars["page"])
	if err != nil {
		w.Write([]byte(err.Error()))
		return
	}

	limit, err := strconv.Atoi(vars["limit"])
	if err != nil {
		w.Write([]byte(err.Error()))
		return
	}

	log.Println("Requested to apps-partner with", myPartner, page, limit)

	log.Println(myPartner)

	result := Mongo.GetPartnerApps(myPartner, page, limit)
	if result == nil {
		w.Write([]byte("There are some errors"))
		return
	}

	var appDetails = make([]*models.AppDetails, len(result))

	for key, value := range result {
		id := value.Id
		appCommon := Cache.GetCommonAppById(id)
		category := Mongo.GetCategoryById(value.Cid)
		appDetails[key] = models.NewAppDetails(value, appCommon, category)
	}

	var byteResult []byte
	byteResult, err = json.Marshal(appDetails)
	w.Header().Set("Content-Type", "application/json")
	if err != nil {
		log.Println(err.Error())
		w.Write([]byte(err.Error()))
	} else {
		w.Write(byteResult)
	}
}
