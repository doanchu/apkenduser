package handlers

import "github.com/doanchu/apkenduser/services"
import "html/template"
import "github.com/gorilla/securecookie"

var Mongo *services.Mongo
var Cache *services.Cache

var Host string
var StorageDir string = "public"
var ServerHost string
var MyTemplate *template.Template
var Scookie *securecookie.SecureCookie
