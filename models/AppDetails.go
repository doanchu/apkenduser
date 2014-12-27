package models

import "strings"

type AppDetails struct {
	Cid            int               `json:"cid"`
	Cname          string            `json:"cname"`
	Desc           string            `json:"desc"`
	ShortDesc      string            `json:shortdesc`
	Id             string            `json:"id"`
	Name           string            `json:"name"`
	Vendor         string            `json:"vendor"`
	Name_seo       string            `json:"name_seo"`
	Size           string            `json:"size"`
	Ss             []string          `json:"ss"`
	Status         int64             `json:"status"`
	Thumbnail      string            `json:"thumbnail"`
	Version        string            `json:"version"`
	Download_link  map[string]string `json:"download_link"`
	Download_type  string            `json:"download_type"`
	Partner        string            `json:"partner"`
	Total_download int64             `json:"total_download"`
	Total_like     int64             `json:"total_like"`
	Total_share    int64             `json:"total_share"`
	Total_rate     int64             `json:"total_rate"`
	Rate           int               `json:"rate"`
	Time_order     int64             `json:"time_order"`
}

func NormalizeAppCommon(a *AppCommon) {
	for key, value := range a.Ss {
		if strings.Index(value, "http") != 0 {
			a.Ss[key] = "http://" + ServerHost + value
		}
	}
	if strings.Index(a.Thumbnail, "http") != 0 {
		a.Thumbnail = "http://" + ServerHost + a.Thumbnail
	}
}

func GetNotNull(first string, second string) string {
	if first == "" {
		return second
	} else {
		return first
	}
}

func NewAppDetails(p *PartnerAppInfo, a *AppCommon, c *Category) *AppDetails {
	if a == nil || c == nil {
		return nil
	}
	NormalizeAppCommon(a)
	totalDownload := p.Total_download + 1000
	if p.Name != "" {
		return &AppDetails{
			Name:           p.Name,
			Desc:           p.Desc,
			ShortDesc:      Left(p.Desc, 200),
			Id:             a.Id,
			Cid:            p.Cid,
			Cname:          c.Name,
			Vendor:         a.Vendor,
			Name_seo:       a.Name_seo,
			Partner:        p.Partner,
			Status:         p.Status,
			Total_download: totalDownload,
			Total_like:     p.Total_like,
			Total_share:    p.Total_share,
			Size:           a.Size,
			Ss:             a.Ss,
			Thumbnail:      a.Thumbnail,
			Version:        a.Version,
			Download_link:  nil,
			Download_type:  "",
			Time_order:     p.Time_order,
		}
	} else {
		return NewAppDetailsFromAppCommon(a, c)
	}

}

func min(x, y int) int {
	if x < y {
		return x
	} else {
		return y
	}
}
func Left(input string, no int) string {
	var temp []rune = []rune(input)
	return string(temp[:min(len(temp), no)])
}

func NewAppDetailsFromAppCommon(a *AppCommon, c *Category) *AppDetails {
	NormalizeAppCommon(a)
	totalDownload := a.Total_download + 1000
	return &AppDetails{
		Name:           a.Name,
		Desc:           a.Desc,
		ShortDesc:      Left(a.Desc, 200),
		Id:             a.Id,
		Cid:            a.Cid,
		Cname:          c.Name,
		Vendor:         a.Vendor,
		Name_seo:       a.Name_seo,
		Partner:        "",
		Status:         a.Status,
		Total_download: totalDownload,
		Total_like:     0,
		Total_share:    0,
		Size:           a.Size,
		Ss:             a.Ss,
		Thumbnail:      a.Thumbnail,
		Version:        a.Version,
		Download_link:  nil,
		Download_type:  "",
	}
}
