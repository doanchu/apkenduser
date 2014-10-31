package main

import "net/http"
import "github.com/gorilla/mux"

func handleIndex(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "public/index.html")
}

func main() {
	router := mux.NewRouter()
	//http.Handle("/", http.FileServer(http.Dir("public")))
	router.PathPrefix("/assets").Handler(http.FileServer(http.Dir("public")))
	router.PathPrefix("/").HandlerFunc(handleIndex)
	http.Handle("/", router)
	http.ListenAndServe(":8080", nil)
}
