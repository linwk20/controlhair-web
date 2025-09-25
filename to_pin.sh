#!/bin/bash
# upload_ctrlhair_web.sh

set -e

# 你的 JWT 放在環境變數裡
JWT="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIxMjJmNDU0Ni1hZDRkLTRmZjktOTMyNC00NjIyMDNiNDBlZmUiLCJlbWFpbCI6IndsaW4zM0B1ci5yb2NoZXN0ZXIuZWR1IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjQ3MjFhZWJmMjk4NGVmMDhlMWY3Iiwic2NvcGVkS2V5U2VjcmV0IjoiYjY5NmYzYWQ5OWM0YjJmOTUyZDA3YWJmYzUyMmQ4NDQ1ODcxNTZlMWFhNTViNmI4ZmZiMWU1NWVjYjAwZmM2YiIsImV4cCI6MTc5MDI4NzY3Mn0.tbbeoafYvabL-vEQdVTmUDUh9RHhbz8LFH0zfhl-t74"
FOLDER="."

cd ~/$FOLDER

# 收集所有檔案
files=()
while IFS= read -r -d '' f; do
  rel="${f#./}"                         # 相對路徑
  files+=(-F "file=@$f;filename=$rel")  # 設定相對路徑，Pinata 會還原資料夾結構
done < <(find . -type f -print0)

# 呼叫 Pinata API
curl -X POST "https://api.pinata.cloud/pinning/pinFileToIPFS" \
  -H "Authorization: Bearer $JWT" \
  "${files[@]}" \
  -F 'pinataMetadata={"name":"ctrlhair_web"}'
