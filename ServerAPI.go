package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
)

type Evento struct {
	fecha         string
	Reto          string
	Descripcion   string
	Participantes []string
}

func main() {
	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/getArtistas", getArtistas)
	router.HandleFunc("/insertEvento", insertEvento)
	err := http.ListenAndServe("0.0.0.0:8080", router)
	if err != nil {
		fmt.Printf("%s", err)
	}
}

func getArtistas(w http.ResponseWriter, req *http.Request) {
	var artista string
	var artistas []string

	db, err := sql.Open("mysql", "jorge:jorge@tcp(192.168.0.8:3306)/drawvote")
	if err != nil {
		log.Fatal(err)
	}

	rows, errd := db.Query("SELECT name FROM artistas")
	if errd != nil {
		log.Fatal(errd)
	}

	for rows.Next() {
		err = rows.Scan(&artista)
		if err != nil {
			log.Fatal(err)
		}
		artistas = append(artistas, artista)
		//fmt.Println(artista)

	}

	rows.Close()

	db.Close()

	res2B, _ := json.Marshal(artistas)

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")
	w.Write(res2B)
}

func insertEvento(w http.ResponseWriter, req *http.Request) {
	var jsonData Evento
	err := json.NewDecoder(req.Body).Decode(&jsonData)

	// b, err := ioutil.ReadAll(req.Body)
	// if err != nil {
	// 	panic(err)
	// }

	// fmt.Printf("%s", b)
	// var msg Evento
	// err = json.Unmarshal(b, &msg)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(jsonData)

	//sql := "insert into evento (fecha, reto, descripcion, participante) values ('" + b.fecha + "','" + b.reto + "','" + b.descripcion + "','" + b.participantes + "')"

	res2B, _ := json.Marshal("msg")

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
	w.Header().Set("Content-Type", "application/json")

	w.Write(res2B)
}
