package main

import "net/http"
import "log"
import "github.com/gorilla/mux"
import "gopkg.in/mgo.v2"

import "./handlers"
import "github.com/doanchu/apkenduser/services"

var session *mgo.Session

func handleIndex(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "public/index.html")
}

func main() {

	log.SetFlags(log.LstdFlags | log.Lshortfile)
	var err error
	var host string = "sv12.mway.vn:27017"
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
		Pool: services.NewRedisPool("localhost:6379"),
		DB:   handlers.Mongo,
	}

	// comments := handlers.Mongo.GetCommentsByAppId("com.facebook.katana", 1, 10)
	// log.Println(*comments[0])
	// cache.SetCommonAppById("com.loveframecollage.loveframe.collage", appInfo)
	// appInfo = handlers.Mongo.GetCommonAppById("com.bfusoftware.ohtv")
	// cache.SetCommonAppById("com.bfusoftware.ohtv", appInfo)
	// ids := []interface{}{}
	// ids = append(ids, "com.loveframecollage.loveframe.collage", "com.bfusoftware.ohtv1")
	// myResult := cache.GetCommonAppByIds(ids...)
	// log.Println(myResult)
	charMap := map[string]string{"À": "A"}
	log.Println(charMap["À"])
	router := mux.NewRouter()

	router.HandleFunc("/api/apps-category/{partner}/{cid}/{page}/{limit}", handlers.AppCategoryHandler)
	router.HandleFunc("/api/apps-{condition}/{partner}/{page}/{limit}", handlers.AppPartnerHandler)
	router.HandleFunc("/api/comments/{app_id}/{page}/{limit}", handlers.CommentsHandler)
	router.PathPrefix("/assets").Handler(http.FileServer(http.Dir("public")))
	router.PathPrefix("/").HandlerFunc(handleIndex)
	http.Handle("/", router)
	http.ListenAndServe(":3000", nil)
}
