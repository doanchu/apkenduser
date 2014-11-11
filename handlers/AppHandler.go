package handlers

import "net/http"
import "github.com/gorilla/mux"
import "encoding/json"
import "strconv"
import "log"
import "github.com/doanchu/apkenduser/models"
import "gopkg.in/mgo.v2/bson"
import "strings"
import "os"
import "io"
import "github.com/doanchu/apkenduser/utils"

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
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte("[]"))
		return
	}

	log.Println("Requested to apps-partner with", myPartner, page, limit)

	log.Println(myPartner)

	var result []*models.PartnerAppInfo
	result = Mongo.GetPartnerAppsByCategory(myPartner, cid, page, limit)
	log.Println(result)
	if result == nil {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte("[]"))
		return
	}

	appDetails := CreateAppDetails(result)
	log.Println(appDetails)
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
	vars := mux.Vars(r)
	log.Println(vars)
	partner := vars["partner"]

	appId := vars["app_id"]

	appCommon := Mongo.GetCommonAppById(appId)
	if appCommon == nil {
		w.Write([]byte("{}"))
		return
	}
	log.Println(appCommon)
	appPartner := Mongo.GetPartnerAppById(partner, appId)

	category := Mongo.GetCategoryById(appCommon.Cid)

	var appDetails *models.AppDetails

	if appPartner == nil {
		appDetails = models.NewAppDetailsFromAppCommon(appCommon, category)
	} else {
		appDetails = models.NewAppDetails(appPartner, appCommon, category)
	}

	WriteJsonResult(w, appDetails)
}

func WriteJsonResult(w http.ResponseWriter, result interface{}) {
	var err error
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
	case "download":
		sortCondition = "-total_download"
	case "new":
		sortCondition = "-_id"
	default:
		w.Header().Set("Content-Type", "application/json")
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
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte("[]"))
		return
	}

	appDetails := CreateAppDetails(result)

	//if condition == "partner-min" || condition == "partner" {
	for _, value := range appDetails {
		if value != nil {
			value.Desc = ""
			value.Ss = nil
		}
	}
	//}

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
		if appCommon == nil {
			log.Println(value.Id)
			appDetails[key] = nil
			continue
		}
		if appCommon.Status == 1 {
			category := Mongo.GetCategoryById(value.Cid)
			appDetails[key] = models.NewAppDetails(value, appCommon, category)
		} else {
			appDetails[key] = nil
		}

	}

	return appDetails

}

func AppDownloadHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	appId := vars["app_id"]
	partner := vars["partner"]

	appCommon := Mongo.GetCommonAppById(appId)
	var downloadLink string = ""
	switch appCommon.Download_type {
	case "adflex":
		adFlexLink := appCommon.Download_link["adflex"]
		dir := "public/static/adflex/" + partner

		//Check if directory exists
		//If not create directory
		if _, err := os.Stat(dir); os.IsNotExist(err) {
			err = os.MkdirAll(dir, 0777)
			if err != nil {
				log.Println(err.Error())
			}

		}

		//Get file from Adflex
		prefix := "http://sv8.mway.vn:88/AdFlexWrapperService/download2/" + appId + "/"
		fileName := strings.Replace(strings.Replace(adFlexLink, prefix, "", -1), "?partner={refcode}", "", -1)
		filePath := dir + "/" + fileName
		//First check if the file exists
		//If not create the file

		// log.Println("Prefix is:", prefix)
		// log.Println("AdFlex link is: ", adFlexLink)
		// log.Println("file name is", fileName)
		if _, err := os.Stat(filePath); os.IsNotExist(err) {
			downloadLink = strings.Replace(adFlexLink, "{refcode}", partner, -1)
			resp, err := http.Get(downloadLink)
			defer resp.Body.Close()
			if err != nil {
				w.WriteHeader(http.StatusInternalServerError)
				w.Write([]byte("There are some errors"))
				return
			}

			out, err := os.Create(filePath)
			defer out.Close()
			if err != nil {
				w.WriteHeader(http.StatusInternalServerError)
				w.Write([]byte("There are some errors"))
				return
			}
			io.Copy(out, resp.Body)

		}
		downloadLink = "/static/adflex/" + partner + "/" + fileName
	case "static":
		downloadLink = appCommon.Download_link["static"]
	case "campaign":
		downloadLink = appCommon.Download_link["campaign"]
		downloadLink = strings.Replace(downloadLink, "{partner}", partner, -1)
	}
	log.Println("Download link is", downloadLink)
	http.Redirect(w, r, downloadLink, http.StatusFound)
	//w.Write([]byte(downloadLink))
}

func SearchAppsHandler(w http.ResponseWriter, r *http.Request) {
	var err error
	_ = err
	vars := mux.Vars(r)

	//partner := vars["partner"]

	query := vars["query"]
	query = utils.ClearVietnameseChars(query)
	query = "\"" + query + "\""

	page, err := strconv.Atoi(vars["page"])
	if err != nil {
		w.Write([]byte(err.Error()))
		return
	}

	limit, err := strconv.Atoi(vars["limit"])
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte("[]"))
		return
	}

	appCommons := Mongo.SearchCommonApps(query, page, limit)
	if appCommons == nil {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte("[]"))
		return
	}
	WriteJsonResult(w, appCommons)
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
	//vars := mux.Vars(r)

	// partner := vars["partner"]

	// page, err := strconv.Atoi(vars["page"])
	// if err != nil {
	// 	w.Write([]byte(err.Error()))
	// 	return
	// }

	// limit, err := strconv.Atoi(vars["limit"])
	// if err != nil {
	// 	w.Write([]byte(err.Error()))
	// 	return
	// }

	//result := Mongo.GetCollectionsByPartner(partner, page, limit)
	result := Mongo.GetAllCollections()
	if result == nil {
		w.Header().Set("Content-Type", "application/json")
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
		w.Header().Set("Content-Type", "application/json")
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

func CategoriesHandler(w http.ResponseWriter, r *http.Request) {
	result := Mongo.GetAllCategories()
	if result == nil {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte("[]"))
		return
	}
	WriteJsonResult(w, result)
}
