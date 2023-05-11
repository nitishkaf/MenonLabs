# Menon Labs: CommonLit Mobile Application
https://github.com/nguyensp/MenonAccess/raw/main/Menon_Progress.gif

  Run instructions for Android:
    • Have an Android emulator running (quickest way to get started), or a device connected.
    • cd "/Users/nguyensp/Documents/MenonLabs/CommonLit/CommonLit" && npx react-native run-android
  
  Run instructions for iOS:
    • cd "/Users/nguyensp/Documents/MenonLabs/CommonLit/CommonLit" && npx react-native run-ios
    - or -
    • Open CommonLit/ios/CommonLit.xcworkspace in Xcode or run "xed -b ios"
    • Hit the Run button
    
  Run instructions for macOS:
    • See https://aka.ms/ReactNativeGuideMacOS for the latest up-to-date instructions.

Basic Git\
git status\
git add .\
git commit -m "whatever text"\
git push\

//create new branch\
git branch\
git checkout -b "110820Branch" //creates new branch and switches to that branch\
git push --set-upstream origin 110820Branch\

//renaming Git Branch\
git checkout <old_name>\
git branch -m <new_name>\
git push origin -u <new_name>\
git push origin --delete <old_name>\

//removing files from the branch\
git rm <file_name>\

//reset local branch to origin\
git reset --hard origin/<branch_name>\

//delete and display all .DS_Store in current folder and subfolders\
find . -name ".DS_Store" -print -delete\

//delete the last commit from the repository\
//moves to previous commit and resets HEAD/Force Push to change\
git reset HEAD^ --hard\
git push -f\
