package main

import "testing"

func TestAverage(t *testing.T) {
	var v float64
	v = 10
	if v != 1.5 {
		t.Error("Expected 1.5, got ", v)
	}
}
