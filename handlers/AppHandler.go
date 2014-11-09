package handlers

import "net/http"
import "github.com/gorilla/mux"
import "encoding/json"
import "strconv"
import "log"
import "github.com/doanchu/apkenduser/models"

func AppCategoryHandler(w http.ResponseWriter, r *http.Request) {
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

	cid, err := strconv.Atoi((vars["cid"]))
	if err != nil {
		w.Write([]byte("[]"))
		return
	}

	log.Println("Requested to apps-partner with", myPartner, page, limit)

	log.Println(myPartner)

	var result []*models.PartnerAppInfo
	result = Mongo.GetPartnerAppsByCategory(myPartner, cid, page, limit)
	if result == nil {
		w.Write([]byte("[]"))
		return
	}

	appDetails := CreateAppDetails(result)

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

func AppPartnerHandler(w http.ResponseWriter, r *http.Request) {
	var err error
	vars := mux.Vars(r)
	log.Println(vars)
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

	condition := vars["condition"]

	var sortCondition string
	switch condition {
	case "partner", "partner-min":
		sortCondition = "-time_order"
	case "like":
		sortCondition = "-total_like"
	case "share":
		sortCondition = "-total_share"
	default:
		w.Write([]byte("[]"))
		return
	}
	// cidStr := vars["cid"]
	// var cid int
	// var isGetByCat bool = false
	// if len(cidStr) != 0 {
	// 	cid, err = strconv.Atoi(vars["cid"])
	// 	if err != nil {
	// 		w.Write([]byte("[]"))
	// 		return
	// 	}
	// 	isGetByCat = true
	// }

	log.Println("Requested to apps-partner with", myPartner, page, limit)

	log.Println(myPartner)

	result := Mongo.GetPartnerApps(myPartner, page, limit, sortCondition)

	// var result []*models.PartnerAppInfo
	// if isGetByCat == true {
	// 	result = Mongo.GetPartnerAppsByCategory(myPartner, cid, page, limit)
	// } else {
	// 	result = Mongo.GetPartnerApps(myPartner, page, limit)
	// }
	if result == nil {
		w.Write([]byte("[]"))
		return
	}

	appDetails := CreateAppDetails(result)

	if condition == "partner-min" {
		for _, value := range appDetails {
			value.Desc = ""
			value.Ss = nil
		}
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

func CreateAppDetails(apps []*models.PartnerAppInfo) []*models.AppDetails {
	var appDetails = make([]*models.AppDetails, len(apps))

	for key, value := range apps {
		id := value.Id
		appCommon := Cache.GetCommonAppById(id)
		category := Mongo.GetCategoryById(value.Cid)
		appDetails[key] = models.NewAppDetails(value, appCommon, category)
	}

	return appDetails

}

func CollectionsHandler(w http.ResponseWriter, r *http.Request) {
	var err error
	vars := mux.Vars(r)

	partner := vars["partner"]

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

	result := Mongo.GetCollectionsByPartner(partner, page, limit)
	if result == nil {
		w.Write([]byte("[]"))
		return
	}

	var byteResult []byte
	byteResult, err = json.Marshal(result)
	w.Header().Set("Content-Type", "application/json")
	if err != nil {
		log.Println(err.Error())
		w.Write([]byte(err.Error()))
	} else {
		w.Write(byteResult)
	}

}

///comments/PARTNER/APP_ID/PAGE/LIMIT

func CommentsHandler(w http.ResponseWriter, r *http.Request) {
	var err error
	vars := mux.Vars(r)

	app_id := vars["app_id"]
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

	result := Mongo.GetCommentsByAppId(app_id, page, limit)
	if result == nil {
		w.Write([]byte("[]"))
		return
	}

	var byteResult []byte
	byteResult, err = json.Marshal(result)
	w.Header().Set("Content-Type", "application/json")
	if err != nil {
		log.Println(err.Error())
		w.Write([]byte(err.Error()))
	} else {
		w.Write(byteResult)
	}
}
