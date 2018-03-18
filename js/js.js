//批注按钮点击效果
function gEBI(id) {
    return document.getElementById(id);
}
var Bton0BackgrondApplier;
var Bton1BackgrondApplier;
var Bton2BackgrondApplier;
var Bton3BackgrondApplier;
var Bton4BackgrondApplier;

function toggleBton0Backgrond() {
    Bton0BackgrondApplier.toggleSelection();
}

function toggleBton1Backgrond() {
    Bton1BackgrondApplier.toggleSelection();
}

function toggleBton2Backgrond() {
    Bton2BackgrondApplier.toggleSelection();
}

function toggleBton3Backgrond() {
    Bton3BackgrondApplier.toggleSelection();
}

function toggleBton4Backgrond() {
    Bton4BackgrondApplier.toggleSelection();
}
window.onload = function () {
    rangy.init();
    // Enable buttons
    var classApplierModule = rangy.modules.ClassApplier;
    // Next line is pure paranoia: it will only return false if the browser has no support for ranges,
    // selections or TextRanges. Even IE 5 would pass this test.
    if (rangy.supported && classApplierModule && classApplierModule.supported) {
        Bton0BackgrondApplier = rangy.createClassApplier("Bton0Backgrond", {
            tagNames: ["span"]
        });
        var toggButton0 = gEBI("button0");
        toggButton0.ontouchstart = toggButton0.touchend = function () {
            toggleBton0Backgrond();
            return true;
        };
    }
    if (rangy.supported && classApplierModule && classApplierModule.supported) {
        Bton1BackgrondApplier = rangy.createClassApplier("Bton1Backgrond", {
            tagNames: ["span"]
        });
        var toggButton1 = gEBI("button1");
        toggButton1.ontouchstart = toggButton1.touchend = function () {
            toggleBton1Backgrond();
            return true;
        };
    }
    if (rangy.supported && classApplierModule && classApplierModule.supported) {
        Bton2BackgrondApplier = rangy.createClassApplier("Bton2Backgrond", {
            tagNames: ["span"]
        });
        var toggButton2 = gEBI("button2");
        toggButton2.ontouchstart = toggButton2.touchend = function () {
            toggleBton2Backgrond();
            return true;
        };
    }
    if (rangy.supported && classApplierModule && classApplierModule.supported) {
        Bton3BackgrondApplier = rangy.createClassApplier("Bton3Backgrond", {
            tagNames: ["span"]
        });
        var toggButton3 = gEBI("button3");
        toggButton3.ontouchstart = toggButton3.touchend = function () {
            toggleBton3Backgrond();
            return true;
        };
    }
    if (rangy.supported && classApplierModule && classApplierModule.supported) {
        Bton4BackgrondApplier = rangy.createClassApplier("Bton4Backgrond", {
            tagNames: ["span"]
        });
        var toggButton4 = gEBI("button4");
        toggButton4.ontouchstart = toggButton4.touchend = function () {
            toggleBton4Backgrond();
            return true;
        };
    }
};
//获取选中文字
function getRangy() {
    var selectedText=rangy.getSelection().toString();
    $$('#selectedTxt0').text(selectedText);
    $$('#selectedTxt1').text(selectedText);
    $$('#selectedTxt2').text(selectedText);
    $$('#selectedTxt3').text(selectedText);
    $$('#selectedTxt4').text(selectedText);
}
function addToPanel(){
    var addMynote = $$('#addNote').val();
    $$('#Mynote').html('<div><p>原文：</p><p>' + selectedText + '</p><p>我的批注</p><p>' + addMynote + '</P></div>');
}