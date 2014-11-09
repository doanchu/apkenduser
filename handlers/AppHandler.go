package handlers

import "net/http"
import "github.com/gorilla/mux"
import "encoding/json"
import "strconv"
import "log"
import "github.com/doanchu/apkenduser/models"
import "gopkg.in/mgo.v2/bson"

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

func AppsPartnerHandler(w http.ResponseWriter, r *http.Request) {
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

func AppCollectionHandler(w http.ResponseWriter, r *http.Request) {
	var err error
	_ = err
	vars := mux.Vars(r)

	//partner := vars["partner"]

	col_id := vars["col_id"]

	if !bson.IsObjectIdHex(col_id) {
		w.Write([]byte("There are some errors"))
		return
	}
	objectId := bson.ObjectIdHex(col_id)
	result := Mongo.GetCollectionById(objectId)

	ids := make([]string, len(result.Apps))
	for key, value := range result.Apps {
		ids[key] = value
	}

	log.Println(ids)
	appCommons := Mongo.GetCommonAppsByIds(ids)

	resultDetails := &models.CollectionDetails{
		Oid:       result.Oid,
		Name:      result.Name,
		Banner:    result.Banner,
		Desc:      result.Desc,
		Permalink: result.Permalink,
		Apps:      appCommons,
		Status:    result.Status,
		Partner:   result.Partner,
	}

	var byteResult []byte
	byteResult, err = json.Marshal(resultDetails)
	w.Header().Set("Content-Type", "application/json")
	if err != nil {
		log.Println(err.Error())
		w.Write([]byte(err.Error()))
	} else {
		w.Write(byteResult)
	}

}

func AppsInCollectionHandler(w http.ResponseWriter, r *http.Request) {
	var err error
	_ = err
	vars := mux.Vars(r)

	//partner := vars["partner"]

	col_id := vars["col_id"]

	if !bson.IsObjectIdHex(col_id) {
		w.Write([]byte("There are some errors"))
		return
	}
	objectId := bson.ObjectIdHex(col_id)
	result := Mongo.GetCollectionById(objectId)

	ids := make([]string, len(result.Apps))
	for key, value := range result.Apps {
		ids[key] = value
	}

	log.Println(ids)
	appCommons := Mongo.GetCommonAppsByIds(ids)

	var byteResult []byte
	byteResult, err = json.Marshal(appCommons)
	w.Header().Set("Content-Type", "application/json")
	if err != nil {
		log.Println(err.Error())
		w.Write([]byte(err.Error()))
	} else {
		w.Write(byteResult)
	}

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
