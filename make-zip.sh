#!/bin/sh
name="optistatus@syntax-austria.org"

rm -f $name.zip
cd  $name && zip -r ../$name.zip *
