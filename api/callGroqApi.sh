#!/bin/bash

# Parámetro que recibirá el mensaje desde el servidor
MESSAGE="$1"

# Llamada a la API de Groq con el mensaje
curl -X POST "https://api.groq.com/openai/v1/chat/completions" \
  -H "Authorization: Bearer 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" \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [{"role": "user", "content": "'"$MESSAGE"'"}],
    "model": "llama-3.3-70b-versatile"
  }'