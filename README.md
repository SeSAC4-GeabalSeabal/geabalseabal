# gaebalsaebal
개발자 커뮤니티 팀 프로젝트 

# git pull request시 참고
```
git checkout develop
git pull origin develop
git checkout -b feature/피처이름

작업

git add .
git commit -m "feat: 메세지"
  ex) git commit -m "feat: Create register input"
  ex) git commit -m "feat: Design register page"
git push origin feature/피처이름

New Pull Request 생성
base : develop
compare : 작업하신 feature

Pull Request 생성 -> ( OPEN 상태 )
MERGE 눌러서 꼭! MERGED 상태로 바꾸기!!!

꼭 MERGED 완료 확인한 뒤!!! 

git checkout develop 
git branch -D feature/피쳐이름

<!-- feature을 한 번 만들 때 작업은 최대 2일까지만. 오류 없이 만들어서 올려주세요. 무조건! -->
<!-- feature은 작은 단위
  ex) 회원가입 -> feature/register_ui, feature/register_insert -->
```


# git 규칙 
```markdown
### Type
feat : 새로운 기능 추가, 기존의 기능을 요구 사항에 맞추어 수정
fix : 기능에 대한 버그 수정
build : 빌드 관련 수정
chore : 패키지 매니저 수정, 그 외 기타 수정 ex) .gitignore
ci : CI 관련 설정 수정
docs : 문서(주석) 수정
style : 코드 스타일, 포맷팅에 대한 수정
refactor : 기능의 변화가 아닌 코드 리팩터링 ex) 변수 이름 변경
test : 테스트 코드 추가/수정
release : 버전 릴리즈

```
