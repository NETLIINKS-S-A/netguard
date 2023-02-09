# ========== B U I L D   S T Y L E S ==========
printf "Build styles?"
read
sass ./source/SCSS/main.scss ./public/styles/main.css
clear
# ========== T R A N S P I L E ==========
printf "Transpile typescript?"
read
tsc
clear
# ========== P R E T T I F Y I N G ==========
printf "Prettify?"
read
# TYPESCRIPT
prettier "*/*/*/*/*/*.ts" --write;
prettier "*/*/*/*/*/*.ts" --write;
prettier "*/*/*/*/*.ts" --write;
prettier "*/*/*/*.ts" --write;
prettier "*/*/*.ts" --write;
# CSS
prettier "*/*/*/*/*.css" --write;
prettier "*/*/*/*.css" --write;
prettier "*/*/*.css" --write;

clear
