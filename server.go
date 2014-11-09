package main

import "net/http"
import "log"
import "github.com/gorilla/mux"
import "gopkg.in/mgo.v2"

import "./handlers"
import "github.com/doanchu/apkenduser/services"

import "html/template"

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

func main() {

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
		Pool: services.NewRedisPool("sv12.mway.vn:6379"),
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

	subRouter := router.Host("{subdomain}.apk.de").Subrouter()
	subRouter.PathPrefix("/assets").Handler(http.FileServer(http.Dir("public")))
	subRouter.PathPrefix("/").HandlerFunc(handleIndex)
	http.Handle("/", router)
	err = http.ListenAndServe(":3000", nil)
	log.Println(err)
}
