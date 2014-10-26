foreach ($file in (ls *.jpg)) {
	convert $file.Name -thumbnail 200x ("thumb-" + $file.Name)
}