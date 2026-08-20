@echo off
title ROK Dispatch
echo Starting ROK Dispatch at http://localhost:4173 ...
start http://localhost:4173
node "%~dp0local\server.js"
