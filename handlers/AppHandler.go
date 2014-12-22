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
import "net"
import "bytes"

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
	var appDetails []*models.AppDetails

	user := Mongo.GetUserByUsername(myPartner)
	log.Println(user)
	if user == nil || user.Store == 0 {
		appCommons := Mongo.GetCommonAppsByCategory(cid, page, limit)

		appDetails = CreateAppDetailsFromAppCommon(appCommons)
	} else {
		var result []*models.PartnerAppInfo
		result = Mongo.GetPartnerAppsByCategory(myPartner, cid, page, limit)
		// log.Println(result)
		if result == nil {
			w.Header().Set("Content-Type", "application/json")
			w.Write([]byte("[]"))
			return
		}
		appDetails = CreateAppDetails(result)
	}

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

	var appDetails []*models.AppDetails

	user := Mongo.GetUserByUsername(myPartner)

	if user == nil || user.Store == 0 {
		commonApps := Mongo.GetCommonAppsByCategory(cid, page, limit)
		appDetails = CreateAppDetailsFromAppCommonWithCategory(commonApps, category)
	} else {
		var result []*models.PartnerAppInfo
		result = Mongo.GetPartnerAppsByCategory(myPartner, cid, page, limit)
		// log.Println(result)
		if result == nil {
			w.Header().Set("Content-Type", "application/json")
			w.Write([]byte("[]"))
			return
		}

		appDetails = CreateAppDetailsWithCategory(result, category)
	}
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
	r.ParseForm()
	vars := mux.Vars(r)
	partner := vars["partner"]

	appId := vars["app_id"]

	newApp := Mongo.GetAppMapper(appId)
	if newApp != nil {
		appId = newApp.New_app
	}

	appCommon := Mongo.GetCommonAppById(appId)
	if appCommon == nil {
		w.Write([]byte("{}"))
		return
	}
	// log.Println(appCommon)
	appPartner := Mongo.GetPartnerAppById(partner, appId)
	log.Println("App Partner is:", partner, appId)
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

	source := r.Form.Get("source")
	// log.Println(r.Form)
	if source == "" {
		if strings.Index(r.Host, ":3000") != -1 {
			source = "app"
		}
	}
	log.Println("Source is", source)
	Mongo.IncAppView(partner, appId, timeInt, source)
}

func StoreHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	// log.Println(vars)
	partner := vars["partner"]

	store := Mongo.GetStoreByPartnerId(partner)
	if store == nil {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte("{}"))
		return
	}
	WriteJsonResult(w, store)
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

	//If there is no user or the user is using default store, get the apps from store beoiu
	if user == nil || user.Store == 0 {
		// appCommon := Mongo.GetCommonApps(page, limit, sortCondition)
		// appDetails := CreateAppDetailsFromAppCommon(appCommon)
		tempAppInfo, _ := Mongo.GetPartnerApps("beoiu", page, limit, sortCondition)
		appDetails := CreateAppDetails(tempAppInfo)

		WriteJsonResult(w, appDetails)
		return
	}

	var adminAppDetails []*models.AppDetails

	//If current page is 1, get top 5 apps from admin's store
	if sortCondition == "-time_order" {
		//appCommons := Mongo.GetCommonApps(1, 5, sortCondition)
		//adminAppDetails = CreateAppDetailsFromAppCommon(appCommons)
		tempAppInfo, _ := Mongo.GetPartnerApps("beoiu", 1, 5, sortCondition)
		adminAppDetails = CreateAppDetails(tempAppInfo)
		//log.Println("Admin apps are:", adminAppDetails)
	}

	var result []*models.PartnerAppInfo
	var appIds []string
	if len(adminAppDetails) > 0 {
		appIds = make([]string, len(adminAppDetails))
		for _, value := range adminAppDetails {
			if value != nil {
				appIds = append(appIds, value.Id)
			}
		}
	}
	//log.Println("App IDs length is", len(appIds))
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

	if page == 1 {
		appDetails = append(adminAppDetails, appDetails...)
	}

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

func CreateAppDetailsFromAppCommonWithCategory(apps []*models.AppCommon, category *models.Category) []*models.AppDetails {
	var appDetails = make([]*models.AppDetails, len(apps))
	for key, value := range apps {
		//category := Mongo.GetCategoryById(value.Cid)
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
			//log.Println(value.Id)
			appDetails[key] = nil
			continue
		}
		//log.Println(appCommon.Status)
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
			//log.Println(value.Id)
			appDetails[key] = nil
			continue
		}
		//log.Println(appCommon.Status)
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
	r.ParseForm()
	vars := mux.Vars(r)
	appId := vars["app_id"]
	partner := vars["partner"]

	if partner == "" {
		partner = vars["subdomain"]
	}

	store := Mongo.GetStoreByPartnerId(partner)
	storeVersion := Cache.GetStoreVersion()
	name := "Android Store"
	icon_36 := ""
	icon_48 := ""
	icon_72 := ""
	icon_96 := ""
	icon_144 := ""
	analytics_id := ""

	if store != nil {
		if store.Img != nil {
			icon_36 = "http://" + Host + "/" + store.Img[0]
			icon_48 = "http://" + Host + "/" + store.Img[1]
			icon_72 = "http://" + Host + "/" + store.Img[2]
			icon_96 = "http://" + Host + "/" + store.Img[3]
			icon_144 = "http://" + Host + "/" + store.Img[4]
		}

		name = store.Name
		analytics_id = store.Analytics_id
	}
	//log.Println(icon_36)
	dir := StorageDir + "/static/adflex/" + partner + "/store"
	queryString := fmt.Sprintf("partner=%s&app_name=%s&icon_36=%s&icon_48=%s&icon_72=%s&icon_96=%s&icon_144=%s&download_id=%s&analytics_id=%s", url.QueryEscape(partner), url.QueryEscape(name), url.QueryEscape(icon_36), url.QueryEscape(icon_48), url.QueryEscape(icon_72), url.QueryEscape(icon_96), url.QueryEscape(icon_144), url.QueryEscape(appId), url.QueryEscape(analytics_id))
	storeServiceLink := fmt.Sprintf("http://sv11.mway.vn:88/ApkStoreService/build?%s", queryString)

	appCommon := Mongo.GetAppCommonByAppId(appId)
	fileName := appId + storeVersion + ".apk"
	if appCommon != nil {
		fileName = utils.ClearNonAlphabetChars(utils.ClearVietnameseChars(appCommon.Name)) + "_" + storeVersion + ".apk"
	}
	//log.Println(storeServiceLink)
	downloadedFileName, _ := DownloadFile(storeServiceLink, dir, fileName)

	var downloadLink = "/static/adflex/" + partner + "/store/" + downloadedFileName

	if strings.Index(r.Host, ":3000") != -1 {
		http.Redirect(w, r, downloadLink, http.StatusFound)
	} else {
		if strings.Index(r.Referer(), "apk.vn") == -1 && strings.Index(r.Referer(), "apk.de") == -1 {
			w.Header().Set("Refresh", "0; "+downloadLink)
			indexHandler(w, r)
		} else {
			http.Redirect(w, r, downloadLink, http.StatusFound)
		}
	}

	//http.Redirect(w, r, "/static/adflex/"+partner+"/store/"+downloadedFileName, http.StatusFound)

	timeStr := time.Now().Format("060102")
	timeInt, _ := strconv.Atoi(timeStr)

	source := r.Form.Get("source")
	if source == "" {
		if strings.Index(r.Host, ":3000") != -1 {
			source = "app"
		}
	}
	Mongo.IncOneStoreDownload(partner, timeInt, source)
	Mongo.IncOneAppDownload(partner, appId, timeInt, source)
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

		if err != nil {
			return "", err
		}
		defer out.Close()

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
	r.ParseForm()
	vars := mux.Vars(r)
	appId := vars["app_id"]
	partner := vars["partner"]

	if partner == "" {
		partner = vars["subdomain"]
	}

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
		// prefix := "http://sv8.mway.vn:88/AdFlexWrapperService/download2/" + appId + "/"
		// fileName := strings.Replace(strings.Replace(adFlexLink, prefix, "", -1), "?partner={refcode}", "", -1)
		fileName := utils.ClearNonAlphabetChars(utils.ClearVietnameseChars(appCommon.Name)) + ".apk"
		filePath := dir + "/" + fileName
		//First check if the file exists
		//If not create the file

		// log.Println("Prefix is:", prefix)
		// log.Println("AdFlex link is: ", adFlexLink)
		// log.Println("file name is", fileName)

		if _, err := os.Stat(filePath); os.IsNotExist(err) {
			downloadLink = strings.Replace(adFlexLink, "{refcode}", partner, -1)
			log.Println("Adflex link is: ", adFlexLink)
			resp, err := http.Get(downloadLink)
			if err != nil {
				w.WriteHeader(http.StatusInternalServerError)
				w.Write([]byte("There are some errors"))
				return
			}
			defer resp.Body.Close()

			out, err := os.Create(filePath)
			if err != nil {
				w.WriteHeader(http.StatusInternalServerError)
				w.Write([]byte("There are some errors"))
				return
			}
			defer out.Close()
			io.Copy(out, resp.Body)

		}
		downloadLink = "http://" + partner + "." + ServerHost + "/static/adflex/" + partner + "/" + fileName
	case "static":
		downloadLink = "http://apk.vn/" + appCommon.Download_link["static"]
	case "campaign":
		downloadLink = appCommon.Download_link["campaign"]
		downloadLink = strings.Replace(downloadLink, "{partner}", partner, -1)
	}
	timeStr := time.Now().Format("060102")
	timeInt, _ := strconv.Atoi(timeStr)

	source := r.Form.Get("source")
	log.Println("Download source is: ", r.Host)
	if source == "" {
		if strings.Index(r.Host, ":3000") != -1 {
			source = "app"
			log.Println("****************source is*************", source)
		} else {
			log.Println("Request URI is:", r.RequestURI)
		}
	}

	Mongo.IncAppDownload(partner, appId, timeInt, source)
	log.Println("Download link is", downloadLink)
	if strings.Index(r.Host, ":3000") != -1 {
		http.Redirect(w, r, downloadLink, http.StatusFound)
	} else {
		if strings.Index(r.Referer(), "apk.vn") == -1 && strings.Index(r.Referer(), "apk.de") == -1 {
			w.Header().Set("Refresh", "0; "+downloadLink)
			indexHandler(w, r)
		} else {
			http.Redirect(w, r, downloadLink, http.StatusFound)
		}
	}
	//w.Write([]byte(downloadLink))
}

func indexHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	//template, err := indexTemplate.ParseFiles("public/index.v2.html")
	// if err != nil {
	// 	w.Write([]byte("There are some errors"))
	// 	return
	// }

	//store := mongo.GetStoreByPartnerId(vars["subdomain"])
	store := Mongo.GetWebStoreByPartner(vars["subdomain"])
	name := "Android Store"
	keywords := "APK.VN,apk.vn,kho ứng dụng lớn nhất,kho ứng dụng"
	description := "APK.VN - Kho ứng dụng lớn nhất Việt Nam"
	favicon := ""
	analytics := ""
	footer := ""

	if store != nil {
		name = store.Domain_title
		keywords = store.Domain_meta_kw
		description = store.Domain_meta_desc
		favicon = store.Domain_fav
		analytics = store.Domain_analytic
		footer = store.Domain_footer
	}

	myAds := Mongo.GetRandomAppAds()
	log.Println(myAds)
	hasPopup := false
	popupName := ""
	popupTitle := ""
	popupContent := ""
	popupIcon := ""
	link_download := ""

	if myAds != nil {
		hasPopup = true
		popupName = myAds.Name
		popupTitle = myAds.Title_ads
		popupContent = myAds.Content
		popupIcon = myAds.Icon
		link_download = strings.Replace(myAds.Link_download, "{partner}", vars["subdomain"], -1) + "?source=popup"
		if strings.Index(link_download, "http") == -1 {
			link_download = "http://apk.vn" + link_download
		}
	}

	log.Println("Popup Title is", popupTitle)
	log.Println("Popup Name is", popupName)
	data := struct {
		Partner      string
		Name         string
		Keywords     string
		Description  string
		Favicon      string
		Analytics    string
		Footer       string
		HasPopup     bool
		PopupName    string
		PopupTitle   string
		PopupContent string
		PopupIcon    string
		PopupLink    string
	}{
		Partner:      vars["subdomain"],
		Name:         name,
		Keywords:     keywords,
		Description:  description,
		Favicon:      favicon,
		Analytics:    analytics,
		Footer:       footer,
		HasPopup:     hasPopup,
		PopupName:    popupName,
		PopupTitle:   popupTitle,
		PopupContent: popupContent,
		PopupIcon:    popupIcon,
		PopupLink:    link_download,
	}

	log.Println(data.Partner)
	MyTemplate.ExecuteTemplate(w, "index", data)
}

func AppOldDownloadHandler(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()
	vars := mux.Vars(r)
	appId := vars["app_id"]
	partner := vars["subdomain"]

	appCommon := Mongo.GetCommonAppById(appId)
	if appCommon == nil {
		http.Error(w, "App Not Found", http.StatusNotFound)
		return
	}
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
		fileName := utils.ClearNonAlphabetChars(utils.ClearVietnameseChars(appCommon.Name)) + ".apk"
		filePath := dir + "/" + fileName //First check if the file exists
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
			if err != nil {
				w.WriteHeader(http.StatusInternalServerError)
				w.Write([]byte("There are some errors"))
				return
			}
			defer out.Close()
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

	source := r.Form.Get("source")
	if source == "" {
		if strings.Index(r.Host, ":3000") != -1 {
			source = "app"
		} else {
			log.Println("Request URI is:", r.RequestURI)
		}
	}

	Mongo.IncAppDownload(partner, appId, timeInt, source)
	log.Println("Download link is", downloadLink)
	if strings.Index(r.Host, ":3000") != -1 {
		http.Redirect(w, r, downloadLink, http.StatusFound)
	} else {
		if strings.Index(r.Referer(), "apk.vn") == -1 && strings.Index(r.Referer(), "apk.de") == -1 {
			w.Header().Set("Refresh", "0; "+downloadLink)
			indexHandler(w, r)
		} else {
			http.Redirect(w, r, downloadLink, http.StatusFound)
		}
	}
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

type IPRange struct {
	Min string
	Max string
}

var mobiIPs []*IPRange = []*IPRange{
	&IPRange{"113.187.0.0", "113.187.0.255"},     // 113.187.0.0/24
	&IPRange{"183.91.6.0", "183.91.6.255"},       // 183.91.6.0/24
	&IPRange{"203.162.240.0", "203.162.240.255"}, // 203.162.240.0/24 new
	// SG
	&IPRange{"123.30.87.0", "123.30.87.15"},      // 123.30.87.0/28 HCSFGi-1
	&IPRange{"123.30.83.16", "123.30.83.23"},     // 123.30.83.16/29 HCSFGi-2
	&IPRange{"222.255.208.0", "222.255.208.255"}, // 222.255.208.0/24 new
	&IPRange{"222.255.209.0", "222.255.209.255"}, // 222.255.209.0/24 new
	&IPRange{"123.30.165.0", "123.30.165.127"},   // 123.30.165.0/25 HCSFGi-1
	&IPRange{"123.30.165.128", "123.30.165.255"}, // 123.30.165.128/25: HCSFGi-2
	&IPRange{"113.187.16.0", "113.187.17.255"},   // 113.187.16.0/23
	// CMC
	&IPRange{"101.99.46.240", "101.99.46.255"}, // 101.99.46.240/28
	&IPRange{"101.99.29.240", "101.99.29.255"}, // 101.99.29.240/28
	// Proxy
	&IPRange{"203.162.21.107", "203.162.21.107"},
	&IPRange{"113.187.31.252", "113.187.31.252"},
	&IPRange{"113.187.4.0", "113.187.4.255"}, //Moi them
	&IPRange{"113.187.3.0", "113.187.3.255"},
	&IPRange{"113.187.5.0", "113.187.5.255"},
	&IPRange{"113.187.22.0", "113.187.22.255"},
	&IPRange{"113.187.23.0", "113.187.23.255"},
}
var viettelIPs []*IPRange = []*IPRange{
	&IPRange{"27.64.0.0", "27.64.255.255"},     // 27.64.0.0/16
	&IPRange{"27.65.0.0", "27.65.255.255"},     // 27.65.0.0/16
	&IPRange{"27.76.0.0", "27.76.255.255"},     // 27.76.0.0/16
	&IPRange{"27.77.0.0", "27.77.255.255"},     // 27.77.0.0/16
	&IPRange{"171.224.0.0", "171.224.255.255"}, // 171.224.0.0/16
	&IPRange{"171.225.0.0", "171.225.255.255"}, // 171.225.0.0/16
	&IPRange{"171.228.0.0", "171.228.255.255"}, // 171.228.0.0/16
	&IPRange{"171.230.0.0", "171.230.255.255"}, // 171.230.0.0/16
	&IPRange{"171.231.0.0", "171.231.255.255"}, // 171.231.0.0/16
	&IPRange{"171.232.0.0", "171.232.255.255"}, // 171.232.0.0/16
	&IPRange{"171.233.0.0", "171.233.255.255"}, // 171.233.0.0/16
	&IPRange{"171.234.0.0", "171.234.255.255"}, // 171.234.0.0/16
	&IPRange{"171.236.0.0", "171.236.255.255"}, // 171.236.0.0/16
	&IPRange{"171.238.0.0", "171.238.255.255"}, // 171.238.0.0/16
	&IPRange{"171.240.0.0", "171.240.255.255"}, // 171.240.0.0/16
	&IPRange{"171.241.0.0", "171.241.255.255"}, // 171.241.0.0/16
	&IPRange{"171.244.0.0", "171.244.255.255"}, // 171.244.0.0/16
	&IPRange{"171.248.0.0", "171.248.255.255"}, // 171.248.0.0/16
	&IPRange{"171.249.0.0", "171.249.255.255"}, // 171.249.0.0/16
	&IPRange{"171.250.0.0", "171.250.255.255"}, // 171.250.0.0/16
	&IPRange{"125.234.49.48", "125.234.49.63"}, // 125.234.49.48/28
	&IPRange{"125.235.49.48", "125.235.49.63"}, // 125.235.49.48/28
	&IPRange{"125.234.72.0", "125.234.72.255"}, //New
	&IPRange{"27.66.0.0", "27.66.255.255"},
	&IPRange{"27.67.0.0", "27.67.255.255"},
	&IPRange{"171.255.5.0", "171.255.5.255"},
	&IPRange{"171.255.6.0", "171.255.6.255"},
}

var vinaIPs []*IPRange = []*IPRange{
	&IPRange{"113.185.0.0", "113.185.31.255"},
	&IPRange{"203.162.0.0", "203.162.255.255"},
}

func isInRange(ipStr string, ranges []*IPRange) bool {
	ip := net.ParseIP(ipStr)
	for _, value := range ranges {
		min := net.ParseIP(value.Min)
		max := net.ParseIP(value.Max)
		if bytes.Compare(ip, min) >= 0 && bytes.Compare(ip, max) <= 0 {
			return true
		}
	}
	return false
}

func BannersHandler(w http.ResponseWriter, r *http.Request) {
	ip, _, _ := net.SplitHostPort(r.RemoteAddr)
	if r.Header.Get("X-FORWARDED-FOR") != "" {
		ips := strings.Split(r.Header.Get("X-FORWARDED-FOR"), ",")
		ip = strings.TrimSpace(ips[0])
	}
	log.Println("IP is", ip)
	op := ""
	if isInRange(ip, mobiIPs) {
		op = "mb"
	} else if isInRange(ip, vinaIPs) {
		op = "vn"
	} else if isInRange(ip, viettelIPs) {
		op = "vt"
	}
	var result []*models.Banner = nil
	log.Println("op is", op)
	if op != "" {
		result = Mongo.GetAllBanners()
		for _, value := range result {
			value.Link = strings.Replace(value.Link, "{op}", op, -1)
		}
	} else {
		result = Mongo.GetBannersForNonCell()
	}
	if result == nil {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte("[]"))
		return
	}
	WriteJsonResult(w, result)
}
