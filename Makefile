DESTDIR ?=
PREFIX ?= 

GOPATH=$(shell pwd)/vendor:$(shell pwd)
GOBIN=$(shell pwd)/bin
GOFILES=$(wildcard *.go)
GONAME=Drawvote

build:
	@GOPATH=$(GOPATH) GOBIN=$(GOBIN) go get .
	@GOPATH=$(GOPATH) GOBIN=$(GOBIN) go build -o $(GONAME) $(GOFILES)
