package main

import "net/http"
import "log"
import "github.com/gorilla/mux"
import "gopkg.in/mgo.v2"

//import "gopkg.in/mgo.v2/bson"
import "github.com/doanchu/apkenduser/handlers"

// type AppInfo struct {
// 	Name string
// 	King *map[string]string
// 	Size *[]int
// }

var session *mgo.Session

func handleIndex(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "public/index.html")
}

func main() {
	var err error
	session, err = mgo.Dial("localhost")
	if err != nil {
		log.Fatal("Fatal")
	} else {
		log.Println("good")
	}
	handlers.Session = session

	// var err error
	// slice1 := []int{}
	// slice1 = append(slice1, 1, 2, 3)
	// session, err = mgo.Dial("localhost")
	// if err != nil {
	// 	panic(err)
	// }
	// defer session.Close()

	// c := session.DB("test").C("app_info")
	// myAppInfo := AppInfo{}
	// iter := c.Find(bson.M{}).Iter()
	// result := AppInfo{}
	// for iter.Next(&result) {
	// 	log.Println(result.Name)
	// }
	// return
	// log.Println(len(*myAppInfo.Size))
	// // return
	// tmpKing := make(map[string]string)
	// tmpKing["this"] = "foo"
	// tmpKing["that"] = "bar"
	// err = c.Insert(&AppInfo{Name: "heyyou", King: &tmpKing, Size: &slice1})
	// if err != nil {
	// 	log.Fatal(err)
	// }
	router := mux.NewRouter()
	//http.Handle("/", http.FileServer(http.Dir("public")))
	router.HandleFunc("/app/list/{page}/{limit}", handlers.AppListHandler)
	router.PathPrefix("/assets").Handler(http.FileServer(http.Dir("public")))
	router.PathPrefix("/").HandlerFunc(handleIndex)
	http.Handle("/", router)
	http.ListenAndServe(":8080", nil)
}
