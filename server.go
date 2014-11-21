package main

import "net/http"
import "log"
import "github.com/gorilla/mux"
import "gopkg.in/mgo.v2"
import _ "gopkg.in/mgo.v2/bson"

import "github.com/doanchu/apkenduser/handlers"
import "github.com/doanchu/apkenduser/services"

import "html/template"
import "code.google.com/p/goconf/conf"
import "strconv"
import "github.com/codegangsta/negroni"
import "github.com/phyber/negroni-gzip/gzip"
import "github.com/doanchu/apkenduser/utils"
import "strings"
import "os"
import _ "time"

var session *mgo.Session

var indexTemplate *template.Template

func handleIndex(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	template, err := indexTemplate.ParseFiles("public/index.html")
	if err != nil {
		w.Write([]byte("There are some errors"))
		return
	}

	store := mongo.GetStoreByPartnerId(vars["subdomain"])
	name := "Android Store"

	if store != nil {
		name = store.Name
	}

	data := struct {
		Partner string
		Name    string
	}{
		Partner: vars["subdomain"],
		Name:    name,
	}
	log.Println(data.Partner)
	template.Execute(w, data)
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

func readConfiguration() {
	c, err := conf.ReadConfigFile("web.cfg")
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

func main() {
	// downloadedFileName, _ := handlers.DownloadFile("http://sv11.mway.vn:88/ApkStoreService/build?partner=duyhungws&app_name=Hung&download_id=123", "public/static/adflex/duyhungws/store/", "test.apk")
	// log.Println(downloadedFileName)
	readConfiguration()
	fs := justFilesFilesystem{http.Dir("public")}
	s := "Bỏ dấu tiếng việt"

	s = utils.ClearVietnameseChars(s)
	log.Println(s)

	var err error
	var host string = mongoHost + ":" + strconv.Itoa(mongoPort)
	session, err = mgo.Dial(host)
	if err != nil {
		log.Fatal("Fatal")
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
	handlers.Host = serverHost

	// mySession := session.Clone()
	// mySession.DB("newapk").C("daily_app_stats").Upsert(bson.M{"partner": "leduykhanhit",
	// 	"id":   "vn.nmt.gamebaitienlen",
	// 	"date": 141108},
	// 	bson.M{"$inc": bson.M{"download": 1}})
	// mySession.Close()
	mongo.IncAppDownload("leduykhanhit", "vn.nmt.gamebaitienlen", 141108)

	// appInfo := handlers.Mongo.GetCommonAppById("com.loveframecollage.loveframe.collage")

	handlers.Cache = &services.Cache{
		Pool: services.NewRedisPool(redisHost + ":" + strconv.Itoa(redisPort)),
		DB:   handlers.Mongo,
	}

	// colResult := handlers.Mongo.GetCollectionById(bson.ObjectIdHex("545e003560e24d82ea541e21"))
	// log.Println(colResult)

	appCommons := handlers.Mongo.GetCommonAppsByIds([]string{"com.digiplex.game", "com.dotgears.flappybird"})
	for _, value := range appCommons {
		log.Println(value)
	}
	//log.Println(appCommons)

	//indexTemplate = template.New("indexTemplate")
	// collectionResult := handlers.Mongo.GetCollectionsByPartner("duyhungws", 1, 1)
	// log.Println(collectionResult)

	// comments := handlers.Mongo.GetCommentsByAppId("com.facebook.katana", 1, 10)
	// log.Println(*comments[0])
	// cache.SetCommonAppById("com.loveframecollage.loveframe.collage", appInfo)
	// appInfo = handlers.Mongo.GetCommonAppById("com.bfusoftware.ohtv")
	// cache.SetCommonAppById("com.bfusoftware.ohtv", appInfo)
	// ids := []interface{}{}
	// ids = append(ids, "com.loveframecollage.loveframe.collage", "com.bfusoftware.ohtv1")
	// myResult := cache.GetCommonAppByIds(ids...)
	// log.Println(myResult)
	// charMap := map[string]string{"À": "A", "Á": "A"}
	// log.Println(charMap["Á"])
	rootRouter := mux.NewRouter()

	router := mux.NewRouter()
	router.PathPrefix("/static").Handler(http.FileServer(fs))
	router.PathPrefix("/css").Handler(http.FileServer(fs))
	router.PathPrefix("/img").Handler(http.FileServer(fs))
	router.PathPrefix("/js").Handler(http.FileServer(fs))
	router.PathPrefix("/material").Handler(http.FileServer(fs))
	router.PathPrefix("/owl-carousel").Handler(http.FileServer(fs))
	router.PathPrefix("/slick").Handler(http.FileServer(fs))

	router.HandleFunc("/api/app/{partner}/{app_id}", handlers.AppPartnerHandler)
	router.HandleFunc("/app/search/{query}/{page}/{limit}", handlers.SearchAppsHandler)
	router.HandleFunc("/app/download/{partner}/{app_id}", handlers.AppDownloadHandler)
	router.HandleFunc("/app/cdownload/{partner}/{app_id}", handlers.OneDownloadHandler)
	router.HandleFunc("/api/collection-details/{partner}/{col_id}", handlers.AppCollectionHandler)
	router.HandleFunc("/api/apps-in-collection/{partner}/{col_id}", handlers.AppsInCollectionHandler)
	router.HandleFunc("/api/apps-category/{partner}/{cid}/{page}/{limit}", handlers.AppCategoryHandler)
	router.HandleFunc("/api/apps-{condition}/{partner}/{page}/{limit}", handlers.AppsPartnerHandler)
	router.HandleFunc("/api/collections", handlers.CollectionsHandler)
	router.HandleFunc("/api/comments/{app_id}/{page}/{limit}", handlers.CommentsHandler)
	router.HandleFunc("/api/categories", handlers.CategoriesHandler)

	subRouter := router.Host("{subdomain}" + "." + serverHost).Subrouter()
	subRouter.PathPrefix("/assets").Handler(http.FileServer(fs))
	subRouter.PathPrefix("/").HandlerFunc(handleIndex)
	//http.Handle("/", router)
	//err = http.ListenAndServe(":"+strconv.Itoa(serverPort), nil)
	rootRouter.PathPrefix("/static/adflex").Handler(http.FileServer(fs))
	//rootRouter.PathPrefix("/static/adflex").HandlerFunc(handleDownload)
	rootRouter.PathPrefix("/").Handler(negroni.New(
		gzip.Gzip(gzip.DefaultCompression),
		negroni.Wrap(router),
	))
	n := negroni.New()
	//n.Use(gzip.Gzip(gzip.DefaultCompression))
	n.UseHandler(rootRouter)
	n.Run(":" + strconv.Itoa(serverPort))
	//router.Handle("/king", negroni.New())
	log.Println(err)
}
