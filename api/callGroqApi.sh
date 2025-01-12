#!/bin/bash

# Parámetro que recibirá el mensaje desde el servidor
MESSAGE="$1"

# Llamada a la API de Groq con el mensaje
curl -X POST "https://api.groq.com/openai/v1/chat/completions" \
  -H "Authorization: Bearer $GROQ_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [{"role": "user", "content": "'"$MESSAGE"'"}],
    "model": "llama-3.3-70b-versatile"
  }'