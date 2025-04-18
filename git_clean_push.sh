#!/bin/bash

echo "🔥 Avvio script Git pulito per VIVO ART..."

# Step 1: Verifica che ci sia Git
if ! command -v git &> /dev/null
then
    echo "❌ Git non è installato. Esci subito fratè."
    exit
fi

# Step 2: Verifica che sia una repo git
if [ ! -d .git ]; then
    echo "❌ Questa cartella non è un repository Git. Vuoi inizializzarla? (y/n)"
    read risposta
    if [ "$risposta" == "y" ]; then
        git init
        echo "✅ Repo inizializzata"
    else
        echo "❌ Esco senza fare niente"
        exit
    fi
fi

# Step 3: Reset se ci sono file strani già tracciati
git reset

# Step 4: Crea il file .gitignore su misura
cat <<EOF > .gitignore
# Ignora tutto il sistema tranne il progetto
/Library/
/Applications/
/System/
/Users/
/.Trash/
/.DS_Store
*.log
*.tmp
*.bak
.vscode/
.idea/
*.swp
*.swo
node_modules/
EOF

echo "✅ .gitignore creato"

# Step 5: Aggiungi solo i file del progetto
git add index.html style.css script.js icons/

# Step 6: Commit
git commit -m "Clean commit: VIVO ART core files"

# Step 7: Chiede se vuoi fare il push
echo "🚀 Vuoi fare il push su GitHub? (y/n)"
read risposta

if [ "$risposta" == "y" ]; then
    git push origin main
else
    echo "👍 Nessun push eseguito"
fi

#!/bin/bash

# Script per pulizia e preparazione git

echo "👉 Creo .gitignore per evitare di caricare file inutili..."

cat <<EOL > .gitignore
.DS_Store
*.log
*.zip
*.tar
*.bz2
*.dmg
*.app
*.mov
*.mp4
*.jpg
*.jpeg
*.heic
*.png
*.mp3
*.pdf
*.doc
*.docx
*.gp3
*.gp4
*.gp5
__MACOSX
.idea
.vscode
node_modules
EOL

echo "✅ .gitignore creato."

echo "👉 Aggiungo solo i file utili..."
git add index.html styles.css script.js icons/

echo "✅ File aggiunti correttamente. Ora puoi fare commit e push."