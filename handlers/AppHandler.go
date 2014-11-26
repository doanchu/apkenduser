package handlers

import "net/http"
import "github.com/gorilla/mux"
import "encoding/json"
import "strconv"
import "log"
import "github.com/doanchu/apkenduser/models"
import "gopkg.in/mgo.v2/bson"
import _ "gopkg.in/mgo.v2"
import "strings"
import "os"
import "io"
import "github.com/doanchu/apkenduser/utils"
import "time"
import "fmt"
import "net/url"

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
	// log.Println(result)
	if result == nil {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte("[]"))
		return
	}

	appDetails := CreateAppDetails(result)
	// log.Println(appDetails)
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

func V2AppCategoryHandler(w http.ResponseWriter, r *http.Request) {
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

	category := Mongo.GetCategoryById(cid)

	if category == nil {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte("{}"))
		return
	}

	var result []*models.PartnerAppInfo
	result = Mongo.GetPartnerAppsByCategory(myPartner, cid, page, limit)
	// log.Println(result)
	if result == nil {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte("[]"))
		return
	}

	appDetails := CreateAppDetailsWithCategory(result, category)
	var finalResult = struct {
		Cname string               `json:"cname"`
		Apps  []*models.AppDetails `json:"apps"`
	}{
		Cname: category.Name,
		Apps:  appDetails,
	}

	// log.Println(appDetails)
	var byteResult []byte
	byteResult, err = json.Marshal(finalResult)
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
	// log.Println(vars)
	partner := vars["partner"]

	appId := vars["app_id"]

	appCommon := Mongo.GetCommonAppById(appId)
	if appCommon == nil {
		w.Write([]byte("{}"))
		return
	}
	// log.Println(appCommon)
	appPartner := Mongo.GetPartnerAppById(partner, appId)

	category := Mongo.GetCategoryById(appCommon.Cid)

	var appDetails *models.AppDetails

	if appPartner == nil {
		appDetails = models.NewAppDetailsFromAppCommon(appCommon, category)
	} else {
		appDetails = models.NewAppDetails(appPartner, appCommon, category)
	}

	WriteJsonResult(w, appDetails)
	timeStr := time.Now().Format("060102")
	timeInt, _ := strconv.Atoi(timeStr)
	Mongo.IncAppView(partner, appId, timeInt)

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

	//partnerApp, err := Mongo.GetPartnerApp(myPartner)
	user := Mongo.GetUserByUsername(myPartner)

	if user == nil || user.Store == 0 {
		appCommon := Mongo.GetCommonApps(page, limit, sortCondition)
		appDetails := CreateAppDetailsFromAppCommon(appCommon)
		WriteJsonResult(w, appDetails)
		return
	}

	var adminAppDetails []*models.AppDetails

	if page == 1 && sortCondition == "-time_order" {
		appCommons := Mongo.GetCommonApps(1, 5, sortCondition)
		adminAppDetails = CreateAppDetailsFromAppCommon(appCommons)
	}

	var result []*models.PartnerAppInfo
	var appIds []string
	if len(adminAppDetails) > 0 {
		appIds = make([]string, len(adminAppDetails))
		for _, value := range adminAppDetails {
			appIds = append(appIds, value.Id)
		}
	}
	log.Println(appIds)
	if len(appIds) == 0 {
		result, err = Mongo.GetPartnerApps(myPartner, page, limit, sortCondition)
	} else {
		result, err = Mongo.GetPartnerAppsNotIn(myPartner, page, limit, sortCondition, appIds)
	}

	// var result []*models.PartnerAppInfo
	// if isGetByCat == true {
	// 	result = Mongo.GetPartnerAppsByCategory(myPartner, cid, page, limit)
	// } else {
	// 	result = Mongo.GetPartnerApps(myPartner, page, limit)
	// }

	//If there is an error or there is no partner app on page 1
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte("[]"))
		return
	}

	appDetails := CreateAppDetails(result)

	appDetails = append(adminAppDetails, appDetails...)

	//if condition == "partner-min" || condition == "partner" {
	for _, value := range appDetails {
		if value != nil {
			value.Desc = ""
			value.Ss = nil
		}
	}
	//}
	WriteJsonResult(w, appDetails)
}

func CreateAppDetailsFromAppCommon(apps []*models.AppCommon) []*models.AppDetails {
	var appDetails = make([]*models.AppDetails, len(apps))
	for key, value := range apps {
		category := Mongo.GetCategoryById(value.Cid)
		appDetails[key] = models.NewAppDetailsFromAppCommon(value, category)
	}
	return appDetails
}

func CreateAppDetails(apps []*models.PartnerAppInfo) []*models.AppDetails {
	var appDetails = make([]*models.AppDetails, len(apps))

	for key, value := range apps {
		id := value.Id
		appCommon := Mongo.GetCommonAppById(id)
		if appCommon == nil {
			log.Println(value.Id)
			appDetails[key] = nil
			continue
		}
		log.Println(appCommon.Status)
		if appCommon.Status == 1 {
			category := Mongo.GetCategoryById(value.Cid)
			appDetails[key] = models.NewAppDetails(value, appCommon, category)
			appDetails[key].Desc = ""
			appDetails[key].Ss = nil
		} else {
			appDetails[key] = nil
		}

	}

	return appDetails
}

func CreateAppDetailsWithCategory(apps []*models.PartnerAppInfo, category *models.Category) []*models.AppDetails {
	var appDetails = make([]*models.AppDetails, len(apps))

	for key, value := range apps {
		id := value.Id
		appCommon := Mongo.GetCommonAppById(id)
		if appCommon == nil {
			log.Println(value.Id)
			appDetails[key] = nil
			continue
		}
		log.Println(appCommon.Status)
		if appCommon.Status == 1 {
			//category := Mongo.GetCategoryById(value.Cid)
			appDetails[key] = models.NewAppDetails(value, appCommon, category)
			appDetails[key].Desc = ""
			appDetails[key].Ss = nil
		} else {
			appDetails[key] = nil
		}

	}

	return appDetails
}

func OneDownloadHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	appId := vars["app_id"]
	partner := vars["partner"]

	store := Mongo.GetStoreByPartnerId(partner)
	storeVersion := Cache.GetStoreVersion()
	name := "Android Store"
	icon_36 := ""
	icon_48 := ""
	icon_72 := ""
	icon_96 := ""
	icon_144 := ""

	if store != nil {
		if store.Img != nil {
			icon_36 = "http://" + Host + "/" + store.Img[0]
			icon_48 = "http://" + Host + "/" + store.Img[1]
			icon_72 = "http://" + Host + "/" + store.Img[2]
			icon_96 = "http://" + Host + "/" + store.Img[3]
			icon_144 = "http://" + Host + "/" + store.Img[4]
		}
		name = store.Name
	}
	log.Println(icon_36)
	dir := StorageDir + "/static/adflex/" + partner + "/store"
	queryString := fmt.Sprintf("partner=%s&app_name=%s&icon_36=%s&icon_48=%s&icon_72=%s&icon_96=%s&icon_144=%s&download_id=%s", url.QueryEscape(partner), url.QueryEscape(name), url.QueryEscape(icon_36), url.QueryEscape(icon_48), url.QueryEscape(icon_72), url.QueryEscape(icon_96), url.QueryEscape(icon_144), url.QueryEscape(appId))
	storeServiceLink := fmt.Sprintf("http://sv11.mway.vn:88/ApkStoreService/build?%s", queryString)
	fileName := appId + storeVersion + ".apk"
	log.Println(storeServiceLink)
	downloadedFileName, _ := DownloadFile(storeServiceLink, dir, fileName)
	http.Redirect(w, r, "/static/adflex/"+partner+"/store/"+downloadedFileName, http.StatusFound)

	timeStr := time.Now().Format("060102")
	timeInt, _ := strconv.Atoi(timeStr)
	Mongo.IncStoreDownload(partner, timeInt)
}

func DownloadFile(link string, dir string, fileName string) (string, error) {
	//If destination directory does not exist, create the directory
	if _, err := os.Stat(dir); os.IsNotExist(err) {
		err = os.MkdirAll(dir, 0777)
		if err != nil {
			return "", err
		}

	}

	//Check if the file exist
	filePath := dir + "/" + fileName
	if _, err := os.Stat(filePath); os.IsNotExist(err) {
		//if not exist
		//Download file
		resp, err := http.Get(link)
		if err != nil {
			return "", err
		}
		defer resp.Body.Close()

		out, err := os.Create(dir + "/" + fileName)
		defer out.Close()

		if err != nil {
			return "", err
		}
		io.Copy(out, resp.Body)
		return fileName, nil
	} else {
		return fileName, nil
	}

	// if resp.Header["Content-Disposition"] != nil {
	// 	contentDisp := resp.Header["Content-Disposition"][0]
	// 	index := strings.Index(contentDisp, "filename=")
	// 	if index != -1 {
	// 		fileName = fileName + contentDisp[index+9:len(contentDisp)]
	// 	} else {
	// 		fileName = fileName + ".apk"
	// 	}
	// } else {
	// 	fileName = fileName + ".apk"
	// }

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
		dir := StorageDir + "/static/adflex/" + partner

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
		log.Println(filePath)
		if _, err := os.Stat(filePath); os.IsNotExist(err) {
			downloadLink = strings.Replace(adFlexLink, "{refcode}", partner, -1)
			log.Println("Adflex link is: ", adFlexLink)
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
		downloadLink = "http://" + partner + "." + ServerHost + "/static/adflex/" + partner + "/" + fileName
	case "static":
		downloadLink = appCommon.Download_link["static"]
	case "campaign":
		downloadLink = appCommon.Download_link["campaign"]
		downloadLink = strings.Replace(downloadLink, "{partner}", partner, -1)
	}
	timeStr := time.Now().Format("060102")
	timeInt, _ := strconv.Atoi(timeStr)
	Mongo.IncAppDownload(partner, appId, timeInt)
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
	//query = "\"" + query + "\""

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

	// log.Println(ids)
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

	// log.Println(ids)
	appCommons := Mongo.GetCommonAppsByIds(ids)

	for _, app := range appCommons {
		models.NormalizeAppCommon(app)
	}

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
	for _, value := range result {
		models.NormalizeCategory(value)
	}

	if result == nil {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte("[]"))
		return
	}
	WriteJsonResult(w, result)
}

func BannersHandler(w http.ResponseWriter, r *http.Request) {
	result := Mongo.GetAllBanners()
	if result == nil {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte("[]"))
		return
	}
	WriteJsonResult(w, result)
}
