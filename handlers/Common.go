package handlers

import "github.com/doanchu/apkenduser/services"

var Mongo *services.Mongo
var Cache *services.Cache

var Host string
var StorageDir string = "public"
