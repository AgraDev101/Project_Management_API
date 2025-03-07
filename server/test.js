let test = () => {
    try {
        return a
	// a is undefined
    } catch (error) {
        console.log(error)
    } finally {
        console.log("there was an error")
    }
}

test()