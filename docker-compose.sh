> ../.dockerignore

while IFS= read -r line; do
  echo "interview-questions-api/$line" >> ../.dockerignore
done < ./.dockerignore

while IFS= read -r line; do
  echo "interview-questions-ui/$line" >> ../.dockerignore
done < ../interview-questions-ui/.dockerignore
