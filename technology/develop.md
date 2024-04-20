# Develop
> v1.0.0 20240329

## Work Flow
- [Team meeting and preparation](https://github.com/CAFECA-IO/WorkGuidelines/blob/main/newbie/software-engineering/01-team-meeting-and-preparation.md)
- [Issue creation](https://github.com/CAFECA-IO/WorkGuidelines/blob/main/newbie/software-engineering/02-issue-creation.md)
- [Requirement specification writing](https://github.com/CAFECA-IO/WorkGuidelines/blob/main/newbie/software-engineering/03-requirement-specification-writing.md)
- [System architecture document writing](https://github.com/CAFECA-IO/WorkGuidelines/blob/main/newbie/software-engineering/04-system-architecture-document-writing.md)
- [Development specitication document writing](https://github.com/CAFECA-IO/WorkGuidelines/blob/main/newbie/software-engineering/05-development-specification-document-writing.md)
- [Wireframe and mockup reading](https://github.com/CAFECA-IO/WorkGuidelines/blob/main/newbie/software-engineering/06-wireframe-and-mockup-reading.md)
- [Project creation](https://github.com/CAFECA-IO/WorkGuidelines/blob/main/newbie/software-engineering/07-project-creation.md)
- [Coding](https://github.com/CAFECA-IO/WorkGuidelines/blob/main/newbie/software-engineering/08-coding.md)
- [Version management](https://github.com/CAFECA-IO/WorkGuidelines/blob/main/newbie/software-engineering/09-version-management.md)
- [Quality management](https://github.com/CAFECA-IO/WorkGuidelines/blob/main/newbie/software-engineering/10-quality-management.md)
- [Release version](https://github.com/CAFECA-IO/WorkGuidelines/blob/main/newbie/software-engineering/11-release-version.md)
- [KM writing](https://github.com/CAFECA-IO/WorkGuidelines/blob/main/newbie/software-engineering/12-KM-writing.md)

## Test-Driven Development
- unit test with jest
- integration test with playwright

## Coding Style
- Use typescript
- Based on airbnb rule
- No logic and function call in return
- No logic and function call in function parameters
- No SQL execution in for loop
- No API call in for loop
- No file IO in for loop
- Use static parameter for specific string or number

## Version Control
- follow [git flow](/newbie/git-flow.md)
- commit your code every day
- merge develop branch into your branch before coding every day
- must update version number before creating a pull request, e.g. 0.8.7 -> 0.8.7+1 -> 0.8.7+2
- creating pull request with [description format](/technology/code-review.md) 
