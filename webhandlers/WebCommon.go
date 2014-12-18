package webhandlers

import "html/template"
import "github.com/doanchu/apkenduser/services"

var MyTemplates *template.Template
var Mongo *services.Mongo
var Cache *services.Cache
