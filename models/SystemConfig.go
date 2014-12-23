package models

type ConfigDetails struct {
	Status int `json:"status"`
	Time   int `json:"time"`
}

type SystemConfig struct {
	Type   string        `json:"type"`
	Config ConfigDetails `json:"config"`
}
