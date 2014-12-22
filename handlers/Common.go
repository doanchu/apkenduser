package handlers

import "github.com/doanchu/apkenduser/services"
import "html/template"

var Mongo *services.Mongo
var Cache *services.Cache

var Host string
var StorageDir string = "public"
var ServerHost string
var MyTemplate *template.Template
