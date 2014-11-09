package main

import "net/http"
import "log"
import "github.com/gorilla/mux"
import "gopkg.in/mgo.v2"

import "./handlers"
import "github.com/doanchu/apkenduser/services"

import "html/template"
import "code.google.com/p/goconf/conf"
import "strconv"
import "github.com/codegangsta/negroni"
import "github.com/phyber/negroni-gzip/gzip"

var session *mgo.Session

var indexTemplate *template.Template

func handleIndex(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	log.Println(vars)
	template, err := indexTemplate.ParseFiles("public/index.html")
	if err != nil {
		w.Write([]byte("There are some errors"))
		return
	}
	data := struct {
		Partner string
	}{
		Partner: vars["subdomain"],
	}
	log.Println(data.Partner)
	template.Execute(w, data)
	//http.ServeFile(w, r, "public/index.html")
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

func main() {
	readConfiguration()

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

	handlers.Mongo = &services.Mongo{
		DB:      "newapk",
		Session: session,
	}

	// appInfo := handlers.Mongo.GetCommonAppById("com.loveframecollage.loveframe.collage")

	handlers.Cache = &services.Cache{
		Pool: services.NewRedisPool(redisHost + ":" + strconv.Itoa(redisPort)),
		DB:   handlers.Mongo,
	}

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
	router := mux.NewRouter()
	router.HandleFunc("/api/apps-category/{partner}/{cid}/{page}/{limit}", handlers.AppCategoryHandler)
	router.HandleFunc("/api/apps-{condition}/{partner}/{page}/{limit}", handlers.AppPartnerHandler)
	router.HandleFunc("/api/collections/{partner}/{page}/{limit}", handlers.CollectionsHandler)
	router.HandleFunc("/api/comments/{app_id}/{page}/{limit}", handlers.CommentsHandler)

	subRouter := router.Host("{subdomain}" + "." + serverHost).Subrouter()
	subRouter.PathPrefix("/assets").Handler(http.FileServer(http.Dir("public")))
	subRouter.PathPrefix("/").HandlerFunc(handleIndex)
	//http.Handle("/", router)
	//err = http.ListenAndServe(":"+strconv.Itoa(serverPort), nil)

	n := negroni.New()
	n.Use(gzip.Gzip(gzip.DefaultCompression))
	n.UseHandler(router)
	n.Run(":" + strconv.Itoa(serverPort))
	log.Println(err)
}
