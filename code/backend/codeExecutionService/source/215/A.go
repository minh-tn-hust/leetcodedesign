package main

import (
	"fmt"
)

func main() {
	var number int

	_, err := fmt.Scan(&number)
	if err != nil {
		fmt.Println("Error reading input:", err)
		return
	}

	fmt.Println("Hello, world!")
	fmt.Println("You entered:", number)
}

