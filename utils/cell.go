package utils

import "net/http"
import "net"
import "bytes"
import "strings"

type IPRange struct {
	Min string
	Max string
}

var MobiIPs []*IPRange = []*IPRange{
	&IPRange{"113.187.0.0", "113.187.0.255"},     // 113.187.0.0/24
	&IPRange{"183.91.6.0", "183.91.6.255"},       // 183.91.6.0/24
	&IPRange{"203.162.240.0", "203.162.240.255"}, // 203.162.240.0/24 new
	// SG
	&IPRange{"123.30.87.0", "123.30.87.15"},      // 123.30.87.0/28 HCSFGi-1
	&IPRange{"123.30.83.16", "123.30.83.23"},     // 123.30.83.16/29 HCSFGi-2
	&IPRange{"222.255.208.0", "222.255.208.255"}, // 222.255.208.0/24 new
	&IPRange{"222.255.209.0", "222.255.209.255"}, // 222.255.209.0/24 new
	&IPRange{"123.30.165.0", "123.30.165.127"},   // 123.30.165.0/25 HCSFGi-1
	&IPRange{"123.30.165.128", "123.30.165.255"}, // 123.30.165.128/25: HCSFGi-2
	&IPRange{"113.187.16.0", "113.187.17.255"},   // 113.187.16.0/23
	// CMC
	&IPRange{"101.99.46.240", "101.99.46.255"}, // 101.99.46.240/28
	&IPRange{"101.99.29.240", "101.99.29.255"}, // 101.99.29.240/28
	// Proxy
	&IPRange{"203.162.21.107", "203.162.21.107"},
	&IPRange{"113.187.31.252", "113.187.31.252"},
	&IPRange{"113.187.4.0", "113.187.4.255"}, //Moi them
	&IPRange{"113.187.3.0", "113.187.3.255"},
	&IPRange{"113.187.5.0", "113.187.5.255"},
	&IPRange{"113.187.22.0", "113.187.22.255"},
	&IPRange{"113.187.23.0", "113.187.23.255"},
}
var ViettelIPs []*IPRange = []*IPRange{
	&IPRange{"27.64.0.0", "27.64.255.255"},     // 27.64.0.0/16
	&IPRange{"27.65.0.0", "27.65.255.255"},     // 27.65.0.0/16
	&IPRange{"27.76.0.0", "27.76.255.255"},     // 27.76.0.0/16
	&IPRange{"27.77.0.0", "27.77.255.255"},     // 27.77.0.0/16
	&IPRange{"171.224.0.0", "171.224.255.255"}, // 171.224.0.0/16
	&IPRange{"171.225.0.0", "171.225.255.255"}, // 171.225.0.0/16
	&IPRange{"171.228.0.0", "171.228.255.255"}, // 171.228.0.0/16
	&IPRange{"171.230.0.0", "171.230.255.255"}, // 171.230.0.0/16
	&IPRange{"171.231.0.0", "171.231.255.255"}, // 171.231.0.0/16
	&IPRange{"171.232.0.0", "171.232.255.255"}, // 171.232.0.0/16
	&IPRange{"171.233.0.0", "171.233.255.255"}, // 171.233.0.0/16
	&IPRange{"171.234.0.0", "171.234.255.255"}, // 171.234.0.0/16
	&IPRange{"171.236.0.0", "171.236.255.255"}, // 171.236.0.0/16
	&IPRange{"171.238.0.0", "171.238.255.255"}, // 171.238.0.0/16
	&IPRange{"171.240.0.0", "171.240.255.255"}, // 171.240.0.0/16
	&IPRange{"171.241.0.0", "171.241.255.255"}, // 171.241.0.0/16
	&IPRange{"171.244.0.0", "171.244.255.255"}, // 171.244.0.0/16
	&IPRange{"171.248.0.0", "171.248.255.255"}, // 171.248.0.0/16
	&IPRange{"171.249.0.0", "171.249.255.255"}, // 171.249.0.0/16
	&IPRange{"171.250.0.0", "171.250.255.255"}, // 171.250.0.0/16
	&IPRange{"125.234.49.48", "125.234.49.63"}, // 125.234.49.48/28
	&IPRange{"125.235.49.48", "125.235.49.63"}, // 125.235.49.48/28
	&IPRange{"125.234.72.0", "125.234.72.255"}, //New
	&IPRange{"27.66.0.0", "27.66.255.255"},
	&IPRange{"27.67.0.0", "27.67.255.255"},
	&IPRange{"171.255.5.0", "171.255.5.255"},
	&IPRange{"171.255.6.0", "171.255.6.255"},
}

var VinaIPs []*IPRange = []*IPRange{
	&IPRange{"113.185.0.0", "113.185.31.255"},
	&IPRange{"203.162.0.0", "203.162.255.255"},
}

func IsInRange(ipStr string, ranges []*IPRange) bool {
	ip := net.ParseIP(ipStr)
	for _, value := range ranges {
		min := net.ParseIP(value.Min)
		max := net.ParseIP(value.Max)
		if bytes.Compare(ip, min) >= 0 && bytes.Compare(ip, max) <= 0 {
			return true
		}
	}
	return false
}

func GetOriginalIp(r *http.Request) string {
	ip, _, _ := net.SplitHostPort(r.RemoteAddr)
	if r.Header.Get("X-FORWARDED-FOR") != "" {
		ips := strings.Split(r.Header.Get("X-FORWARDED-FOR"), ",")
		ip = strings.TrimSpace(ips[0])
	}
	return ip
}
