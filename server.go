package main

import "net/http"
import "log"
import "github.com/gorilla/mux"
import "gopkg.in/mgo.v2"

import "github.com/doanchu/apkenduser/handlers"
import "github.com/doanchu/apkenduser/services"
import "reflect"
import "fmt"

var session *mgo.Session

func handleIndex(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "public/index.html")
}

type King struct {
}

func main() {

	b := true
	s := ""
	n := 1
	f := 1.0
	a := []string{"foo", "bar", "baz"}

	fmt.Println(reflect.TypeOf(b))
	fmt.Println(reflect.TypeOf(s))
	fmt.Println(reflect.TypeOf(n))
	fmt.Println(reflect.TypeOf(f))
	fmt.Println(reflect.TypeOf(a))

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

	// cache.SetCommonAppById("com.loveframecollage.loveframe.collage", appInfo)
	// appInfo = handlers.Mongo.GetCommonAppById("com.bfusoftware.ohtv")
	// cache.SetCommonAppById("com.bfusoftware.ohtv", appInfo)
	// ids := []interface{}{}
	// ids = append(ids, "com.loveframecollage.loveframe.collage", "com.bfusoftware.ohtv1")
	// myResult := cache.GetCommonAppByIds(ids...)
	// log.Println(myResult)
	router := mux.NewRouter()

	router.HandleFunc("/rest/apps-partner/{partner}/{page}/{limit}", handlers.AppPartnerHandler)
	router.PathPrefix("/assets").Handler(http.FileServer(http.Dir("public")))
	router.PathPrefix("/").HandlerFunc(handleIndex)
	http.Handle("/", router)
	http.ListenAndServe(":8080", nil)
}
