package webhandlers

import "net/http"

import "github.com/gorilla/mux"
import "encoding/json"
import "github.com/doanchu/apkenduser/models"
import "html/template"
import "strconv"

// import "strconv"
import "log"

// import "github.com/doanchu/apkenduser/models"

// import "gopkg.in/mgo.v2/bson"
// import _ "gopkg.in/mgo.v2"
import "strings"

// import "os"
// import "io"
// import "github.com/doanchu/apkenduser/utils"

// import "time"
// import "fmt"
// import "net/url"

func GetAppDetails(partner string, page int, limit int, sortCondition string) []*models.AppDetails {
	//partnerApp, err := Mongo.GetPartnerApp(myPartner)
	var err error
	user := Mongo.GetUserByUsername(partner)

	//If there is no user or the user is using default store, get the apps from store beoiu
	if user == nil || user.Store == 0 {
		// appCommon := Mongo.GetCommonApps(page, limit, sortCondition)
		// appDetails := CreateAppDetailsFromAppCommon(appCommon)
		tempAppInfo, _ := Mongo.GetPartnerApps("beoiu", page, limit, sortCondition)
		appDetails := CreateAppDetails(tempAppInfo)

		//WriteJsonResult(w, appDetails)
		return appDetails
	}

	var adminAppDetails []*models.AppDetails

	//If current page is 1, get top 5 apps from admin's store
	if sortCondition == "-time_order" {
		//appCommons := Mongo.GetCommonApps(1, 5, sortCondition)
		//adminAppDetails = CreateAppDetailsFromAppCommon(appCommons)
		tempAppInfo, _ := Mongo.GetPartnerApps("beoiu", 1, 5, sortCondition)
		adminAppDetails = CreateAppDetails(tempAppInfo)
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

	if len(appIds) == 0 {
		result, err = Mongo.GetPartnerApps(partner, page, limit, sortCondition)
	} else {
		result, err = Mongo.GetPartnerAppsNotIn(partner, page, limit, sortCondition, appIds)
	}

	//If there is an error or there is no partner app on page 1
	if err != nil {
		return make([]*models.AppDetails, 0, 0)
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

	return appDetails

}

type StoreDetails struct {
	Partner       string
	Name          string
	Keywords      string
	Description   string
	Favicon       string
	Analytics     string
	Footer        string
	HasPopup      bool
	PopupName     string
	PopupTitle    string
	PopupContent  string
	PopupIcon     string
	Link_download string
}

func GetStoreDetails(partner string) *StoreDetails {
	store := Mongo.GetWebStoreByPartner(partner)
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
		link_download = strings.Replace(myAds.Link_download, "{partner}", partner, -1) + "?source=popup"
		if strings.Index(link_download, "http") == -1 {
			link_download = "http://apk.vn" + link_download
		}
	}

	return &StoreDetails{
		Partner:       partner,
		Name:          name,
		Keywords:      keywords,
		Description:   description,
		Favicon:       favicon,
		Analytics:     analytics,
		Footer:        footer,
		HasPopup:      hasPopup,
		PopupName:     popupName,
		PopupTitle:    popupTitle,
		PopupContent:  popupContent,
		PopupIcon:     popupIcon,
		Link_download: link_download,
	}
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

type HomePortion struct {
	Banner         *models.Banner
	FirstCategory  *models.Category
	FirstLine      []*models.AppDetails
	SecondCategory *models.Category
	SecondLine     []*models.AppDetails
}

func HomeHandler(w http.ResponseWriter, r *http.Request) {
	var err error
	log.Println("This is home page")
	vars := mux.Vars(r)

	storeDetails := GetStoreDetails(vars["subdomain"])

	myPartner := vars["subdomain"]
	if err != nil {
		w.Write([]byte(err.Error()))
		return
	}

	banners := Mongo.GetAllBanners()
	categories := Mongo.GetAllCategories()

	pos := 0
	bannerPos := 0
	currentPortion := &HomePortion{}
	portions := make([]*HomePortion, 0, len(categories)/2+1)
	myPartner = "beoiu"
	for _, cat := range categories {
		if pos%2 == 0 {
			currentPortion = &HomePortion{}
			if bannerPos > len(banners)-1 {
				bannerPos = 0
			}
			currentPortion.Banner = banners[bannerPos]
			currentPortion.FirstCategory = cat
			tempAppInfo := Mongo.GetPartnerAppsByCategory(myPartner, cat.Id, 1, 3)
			currentPortion.FirstLine = CreateAppDetails(tempAppInfo)
		} else {
			currentPortion.SecondCategory = cat
			tempAppInfo := Mongo.GetPartnerAppsByCategory(myPartner, cat.Id, 1, 3)
			currentPortion.SecondLine = CreateAppDetails(tempAppInfo)
			portions = append(portions, currentPortion)
		}
		pos = pos + 1
	}
	if currentPortion.SecondCategory == nil {
		portions = append(portions, currentPortion)
	}

	data := struct {
		Sdetails *StoreDetails
		Page     string
		Portions []*HomePortion
	}{
		Sdetails: storeDetails,
		Portions: portions,
		Page:     "Trang chủ",
	}
	log.Println(storeDetails)
	MyTemplates.ExecuteTemplate(w, "home", data)
}

func TopAppHandler(w http.ResponseWriter, r *http.Request) {
	var err error
	log.Println("This is the love")
	vars := mux.Vars(r)
	//template, err := indexTemplate.ParseFiles("public/index.v2.html")
	// if err != nil {
	// 	w.Write([]byte("There are some errors"))
	// 	return
	// }

	//store := mongo.GetStoreByPartnerId(vars["subdomain"])
	//store := Mongo.GetWebStoreByPartner(vars["subdomain"])
	storeDetails := GetStoreDetails(vars["subdomain"])

	myPartner := vars["subdomain"]
	if err != nil {
		w.Write([]byte(err.Error()))
		return
	}

	limit := 10
	page := 1

	condition := vars["condition"]
	var sortCondition string = "-time_order"

	switch condition {
	case "downloads":
		sortCondition = "-total_download"
	case "standings":
		sortCondition = "-total_like"
	case "new":
		sortCondition = "_id"
	}
	appDetails := GetAppDetails(myPartner, page, limit, sortCondition)
	var dataJSON = getJSONString(appDetails)

	data := struct {
		Sdetails *StoreDetails
		Page     string
		AppList  template.JS
	}{
		Sdetails: storeDetails,
		AppList:  template.JS(dataJSON),
		Page:     condition,
	}
	log.Println(dataJSON)
	MyTemplates.ExecuteTemplate(w, "topApp", data)
}

func CategoryHandler(w http.ResponseWriter, r *http.Request) {
	var err error

	vars := mux.Vars(r)
	storeDetails := GetStoreDetails(vars["subdomain"])

	myPartner := vars["subdomain"]
	if err != nil {
		w.Write([]byte(err.Error()))
		return
	}

	limit := 100
	page := 1
	cid, err := strconv.Atoi((vars["cid"]))
	category := Mongo.GetCategoryById(cid)

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
		if result != nil {
			appDetails = CreateAppDetails(result)
		}
	}

	var dataJSON = getJSONString(appDetails)

	data := struct {
		Sdetails *StoreDetails
		Page     string
		Cname    string
		AppList  template.JS
	}{
		Sdetails: storeDetails,
		AppList:  template.JS(dataJSON),
		Page:     category.Name,
		Cname:    category.Name,
	}
	log.Println(dataJSON)
	MyTemplates.ExecuteTemplate(w, "category", data)
}

func CategoriesHandler(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)
	result := Mongo.GetAllCategories()
	for _, value := range result {
		models.NormalizeCategory(value)
	}

	storeDetails := GetStoreDetails(vars["subdomain"])

	data := struct {
		Sdetails *StoreDetails
		Page     string
		AppList  []*models.Category
	}{
		Sdetails: storeDetails,
		AppList:  result,
		Page:     "categories",
	}

	log.Println(result[0])
	MyTemplates.ExecuteTemplate(w, "categories", data)
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

func getJSONString(result interface{}) string {
	byteResult, err := json.Marshal(result)
	if err != nil {
		return "{}"
	} else {
		return string(byteResult)
	}

}

func CreateAppDetailsFromAppCommon(apps []*models.AppCommon) []*models.AppDetails {
	var appDetails = make([]*models.AppDetails, len(apps))
	for key, value := range apps {
		category := Mongo.GetCategoryById(value.Cid)
		appDetails[key] = models.NewAppDetailsFromAppCommon(value, category)
	}
	return appDetails
}
