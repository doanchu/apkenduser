package main

import "net/http"
import "log"
import "github.com/gorilla/mux"
import "gopkg.in/mgo.v2"
import "gopkg.in/mgo.v2/bson"

import "github.com/doanchu/apkenduser/handlers"
import "github.com/doanchu/apkenduser/webhandlers"
import "github.com/doanchu/apkenduser/services"
import "github.com/doanchu/apkenduser/models"

import "html/template"
import "code.google.com/p/goconf/conf"
import "strconv"
import "github.com/codegangsta/negroni"
import "github.com/phyber/negroni-gzip/gzip"
import "github.com/doanchu/apkenduser/utils"
import "strings"
import "os"
import _ "time"
import "runtime"
import "errors"
import "github.com/gorilla/securecookie"

var session *mgo.Session

var indexTemplate *template.Template

var hashKey = []byte("mylovelyapkvn")
var blockKey = []byte("apkvnunited")

var scookie = securecookie.New(hashKey, blockKey)

//var myTemplate, _ = indexTemplate.ParseFiles("public/index.v2.html")

func dict(values ...interface{}) (map[string]interface{}, error) {
	if len(values)%2 != 0 {
		return nil, errors.New("invalid dict call")
	}
	dict := make(map[string]interface{}, len(values)/2)
	for i := 0; i < len(values); i += 2 {
		key, ok := values[i].(string)
		if !ok {
			return nil, errors.New("dict keys must be strings")
		}
		dict[key] = values[i+1]
	}
	return dict, nil
}

var templateDir = "./templates/v3/"
var myTemplate = template.New("templates")

func handleIndex(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	//template, err := indexTemplate.ParseFiles("public/index.v2.html")
	// if err != nil {
	// 	w.Write([]byte("There are some errors"))
	// 	return
	// }

	//store := mongo.GetStoreByPartnerId(vars["subdomain"])
	store := mongo.GetWebStoreByPartner(vars["subdomain"])
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

	myAds := mongo.GetRandomAppAds()
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
	myTemplate.ExecuteTemplate(w, "index", data)
	//http.ServeFile(w, r, "public/index.html")
}

func handleDownload(w http.ResponseWriter, r *http.Request) {
	upath := r.URL.Path
	if !strings.HasPrefix(upath, "/") {
		upath = "/" + upath
		r.URL.Path = upath
	}
	utils.ServeFile(w, r, "public"+upath)

}

var mongoHost string
var mongoPort int

var redisHost string
var redisPort int

var serverHost string
var serverPort int

var storageDir string

func readConfiguration() {
	c, err := conf.ReadConfigFile("web.v3.cfg")
	if err != nil {
		log.Fatal("Cannot read configuration file")
		return
	}
	mongoHost, err = c.GetString("mongodb", "host")
	if err != nil {
		log.Fatal("Mongodb host is missing or invalid")
		return
	}
	mongoPort, err = c.GetInt("mongodb", "port")
	if err != nil {
		log.Fatal("Mongodb port is missing or invalid")
	}
	redisHost, err = c.GetString("redis", "host")
	if err != nil {
		log.Fatal("Redis host is missing or invalid")
		return
	}
	redisPort, err = c.GetInt("redis", "port")
	if err != nil {
		log.Fatal("Redis port is missing or invalid")
		return
	}
	serverHost, err = c.GetString("default", "host")
	if err != nil {
		log.Fatal("Host is missing or invalid")
		return
	}
	serverPort, err = c.GetInt("default", "port")
	if err != nil {
		log.Fatal("Port is missing or invalid")
		return
	}

	storageDir, err = c.GetString("storage", "apk")
	if err != nil {
		//log.Fatal("Host is missing or invalid")
		storageDir = "public"
		return
	}

}

type justFilesFilesystem struct {
	fs http.FileSystem
}

func (fs justFilesFilesystem) Open(name string) (http.File, error) {
	f, err := fs.fs.Open(name)
	if err != nil {
		return nil, err
	}
	return neuteredReaddirFile{f}, nil
}

type neuteredReaddirFile struct {
	http.File
}

func (f neuteredReaddirFile) Readdir(count int) ([]os.FileInfo, error) {
	return nil, nil
}

var mongo *services.Mongo

func parkDomainMiddleWare(w http.ResponseWriter, r *http.Request, next http.HandlerFunc) {
	hostPart := strings.Split(r.Host, ":")[0]

	if hostPart == "apk.vn" || strings.Contains(hostPart, "."+serverHost) {
		next.ServeHTTP(w, r)
	} else {
		webStore := mongo.GetWebStoreByDomain(hostPart)
		if webStore == nil {
			next.ServeHTTP(w, r)
		} else {
			log.Println(webStore)
			r.Host = webStore.Domain_partner + "." + serverHost
			log.Println(r.Host)
			next.ServeHTTP(w, r)
		}
	}
}

func max(x, y int) int {
	if x > y {
		return x
	} else {
		return y
	}
}

func OidHex(id bson.ObjectId) string {
	return id.Hex()
}

func GetSize(size string) string {
	intSize, _ := strconv.Atoi(size)
	tmpSize := intSize / (1024 * 1024)
	if tmpSize == 0 {
		tmpSize = intSize / 1024
		return strconv.Itoa(tmpSize) + " KB"
	} else {
		return strconv.Itoa(tmpSize) + " MB"
	}
}

func prepareTemplate() {
	myTemplate = template.Must(template.New("").Funcs(template.FuncMap{
		"OidHex":  OidHex,
		"GetSize": GetSize,
	}).ParseFiles(
		templateDir+"app.css",
		templateDir+"home.html",
		templateDir+"navbar.html",
		templateDir+"topapp.html",
		templateDir+"searchbox.html",
		templateDir+"categories.html",
		templateDir+"category.html",
		templateDir+"collections.html",
		templateDir+"collection.html",
		templateDir+"featured.html",
		templateDir+"footer.html",
		templateDir+"item.html",
		templateDir+"banner.html",
		templateDir+"loadMore.js",
		templateDir+"appdetails.html",
		templateDir+"searchtools.html",
		templateDir+"search.html",
		templateDir+"rightsidebar.html",
		templateDir+"leftsidebar.html",
		templateDir+"mainheader.html",
		templateDir+"footerads.html",
		templateDir+"ga.html",
	))
	webhandlers.MyTemplates = myTemplate
}

func prepareMongo() {
	var host string = mongoHost + ":" + strconv.Itoa(mongoPort)
	log.Println(host)
	var err error
	session, err = mgo.Dial(host)
	if err != nil {
		log.Fatal(err.Error())
	} else {
		log.Println("Ready to connect to mongodb")
	}
	var newApkCred = &mgo.Credential{
		Username: "newapk",
		Password: "teamapk1@#$",
		Source:   "newapk",
	}

	err = session.Login(newApkCred)
	if err != nil {
		log.Fatal("Failed to authenticate")
	}

	mongo = &services.Mongo{
		DB:      "newapk",
		Session: session,
	}
	handlers.Mongo = mongo
	webhandlers.Mongo = mongo
}

func prepareCache() {
	handlers.Cache = &services.Cache{
		Pool: services.NewRedisPool(redisHost + ":" + strconv.Itoa(redisPort)),
		DB:   handlers.Mongo,
	}
}

func initRouter() {
	fs := justFilesFilesystem{http.Dir("public")}

	rootRouter := mux.NewRouter()

	router := mux.NewRouter()
	router.PathPrefix("/static").Handler(http.FileServer(fs))
	router.PathPrefix("/css").Handler(http.FileServer(fs))
	router.PathPrefix("/img").Handler(http.FileServer(fs))
	router.PathPrefix("/js").Handler(http.FileServer(fs))
	router.PathPrefix("/material").Handler(http.FileServer(fs))
	router.PathPrefix("/owl-carousel").Handler(http.FileServer(fs))
	router.PathPrefix("/slick").Handler(http.FileServer(fs))
	router.PathPrefix("/v3").Handler(http.FileServer(fs))

	router.HandleFunc("/api/app/{partner}/{appId}", handlers.AppPartnerHandler)
	router.HandleFunc("/app/search/{query}/{page}/{limit}", handlers.SearchAppsHandler)
	router.HandleFunc("/app/suggestion/{keywords}", handlers.SearchSuggestionHandler)
	router.HandleFunc("/app/download/{partner}/{appId}", handlers.AppDownloadHandler)
	router.HandleFunc("/app/cdownload/{partner}/{appId}", handlers.OneDownloadHandler)
	router.HandleFunc("/api/collection-details/{partner}/{col_id}", handlers.AppCollectionHandler)
	router.HandleFunc("/api/store/{partner}", handlers.StoreHandler)
	router.HandleFunc("/api/apps-in-collection/{partner}/{col_id}", handlers.AppsInCollectionHandler)
	router.HandleFunc("/api/apps-category/{partner}/{cid}/{page}/{limit}", handlers.AppCategoryHandler)
	router.HandleFunc("/api/v2/apps-category/{partner}/{cid}/{page}/{limit}", handlers.V2AppCategoryHandler)
	router.HandleFunc("/api/apps-{condition}/{partner}/{page}/{limit}", handlers.AppsPartnerHandler)
	router.HandleFunc("/api/collections", handlers.CollectionsHandler)
	router.HandleFunc("/api/comments/{appId}/{page}/{limit}", handlers.CommentsHandler)
	router.HandleFunc("/api/categories", handlers.CategoriesHandler)
	router.HandleFunc("/api/banners", handlers.BannersHandler)

	subRouter := router.Host("{subdomain}" + "." + serverHost).Subrouter()
	subRouter.HandleFunc("/app/download/{appId}.apk", handlers.AppDownloadHandler)
	subRouter.HandleFunc("/app/download/{appId}", handlers.AppDownloadHandler)
	subRouter.HandleFunc("/download/{appId}.html", handlers.OneDownloadHandler)
	subRouter.HandleFunc("/app/cdownload/{appId}.apk", handlers.OneDownloadHandler)
	subRouter.HandleFunc("/app/cdownload/{appId}", handlers.OneDownloadHandler)
	subRouter.HandleFunc("/manager", func(w http.ResponseWriter, r *http.Request) {
		http.Redirect(w, r, "http://"+serverHost+"/manager", http.StatusFound)
	})
	subRouter.PathPrefix("/assets").Handler(http.FileServer(fs))
	//subRouter.PathPrefix("/").HandlerFunc(webhandlers.HomeHandler))
	subRouter.HandleFunc("/", webhandlers.HomeHandler)
	subRouter.HandleFunc("/top/{condition:downloads|new|standings|hot}", webhandlers.TopAppHandler)
	subRouter.HandleFunc("/app/{condition:standings}", webhandlers.TopAppHandler)
	subRouter.HandleFunc("/app/categories", webhandlers.CategoriesHandler)
	subRouter.HandleFunc("/app/collections", webhandlers.CollectionsHandler)
	subRouter.HandleFunc("/app/category/{cid}", webhandlers.CategoryHandler)
	subRouter.HandleFunc("/app/collection/{colId}", webhandlers.CollectionHandler)
	subRouter.HandleFunc("/app/{appId}.html", webhandlers.AppDetailsHandler)

	subRouter.HandleFunc("/search", webhandlers.SearchAppsHandler)
	subRouter.HandleFunc("/app/search", webhandlers.SearchAppsHandler)

	//http.Handle("/", router)
	//err = http.ListenAndServe(":"+strconv.Itoa(serverPort), nil)
	rootRouter.PathPrefix("/static/adflex").Handler(http.FileServer(fs))
	//rootRouter.PathPrefix("/static/adflex").HandlerFunc(handleDownload)
	rootRouter.PathPrefix("/").Handler(negroni.New(
		negroni.HandlerFunc(parkDomainMiddleWare),
		gzip.Gzip(gzip.DefaultCompression),
		negroni.Wrap(router),
	))
	n := negroni.New()
	//n.Use(gzip.Gzip(gzip.DefaultCompression))
	n.UseHandler(rootRouter)
	n.Run(":" + strconv.Itoa(serverPort))
	//router.Handle("/king", negroni.New())
}

func main() {
	f, err := os.OpenFile("apkenduser.log", os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
	if err != nil {
		log.Fatal("error opening file: %v", err)
	}
	defer f.Close()
	//log.SetOutput(f)
	maxProcs := runtime.GOMAXPROCS(4)
	log.Println("Max procs is", maxProcs)
	downloadedFileName, _ := handlers.DownloadFile("http://sv11.mway.vn:88/ApkStoreService/build?partner=duyhungws&app_name=Hung&download_id=123", "public/static/adflex/duyhungws/store/", "test")
	log.Println(downloadedFileName)
	readConfiguration()
	prepareTemplate()
	prepareMongo()

	handlers.Host = serverHost
	handlers.StorageDir = storageDir
	handlers.ServerHost = serverHost
	models.ServerHost = serverHost

	initRouter()
}
