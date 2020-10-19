function noFormat() {
    let elements: Array<string> = [
        "remove_comments",
        "remove_lines",
        "remove_report",
        "check_alias",
        "sign_align_in",
        "sign_align_port",
        "sign_align_generic",
        "sign_align_function",
        "sign_align_procedure",
        "sign_align_all",
        "new_line_after",
        "use_space",
        "customise_indentation",
        "compress",
        "mix_letter",
        "cust_eol",
        "sign_align_mode",
        "keyword",
        "typename",
        "align_comments",
        "add_extraEOL"
    ];
    var isDisabled = getHTMLInputElement("no_format").checked;
    changeStateOfElements(elements, isDisabled);
    let radioButtons = <HTMLCollectionOf<HTMLInputElement>>document.getElementsByTagName("input");
    for (let i = 0; i < radioButtons.length; i++) {
        if ((<HTMLInputElement>radioButtons[i]).type == "radio") {
            (<HTMLInputElement>radioButtons[i]).disabled = isDisabled;
        }
    }
}

function changeStateOfElements(elements: string[], isDisabled: boolean) {
    elements.forEach(element => {
        var htmlElement = getHTMLInputElement(element + "_div");
        try {
            getHTMLInputElement(element).disabled = isDisabled;
        }
        catch { }
        if (isDisabled) {
            htmlElement.className += " disabled";
        }
        else {
            htmlElement.className = htmlElement.className.replace(/\bdisabled\b/g, "");
        }
    });
}

function getHTMLInputElement(id: string): HTMLInputElement {
    return <HTMLInputElement>document.getElementById(id);
}

function Compress(input: string) {
    input = input.replace(/\r\n/g, '');
    input = input.replace(/[\t ]+/g, ' ');
    input = input.replace(/[ ]?([&=:\-<>\+|])[ ]?/g, '$1');
    return input;
}

function MixLetters(input: string) {
    let arr = input.split("");
    for (var k = 0; k < arr.length; k++) {
        if (arr[k] === arr[k].toUpperCase() && Math.random() > 0.5) {
            arr[k] = arr[k].toLowerCase();
        } else if (Math.random() > 0.5) {
            arr[k] = arr[k].toUpperCase();
        }
    }
    return arr.join("");
}

function wordWrap() {
    let d = getHTMLInputElement("result");
    if (d.className == "") {
        d.className = "wordwrap";
    } else {
        d.className = "";
    }
}

function alignAllSigns(alignAll: boolean) {
    if (alignAll) {
        getHTMLInputElement("sign_align_port").checked = false;
        getHTMLInputElement("sign_align_generic").checked = false;
        getHTMLInputElement("sign_align_procedure").checked = false;
        getHTMLInputElement("sign_align_function").checked = false;
        getHTMLInputElement("sign_align_mode_div").disabled = false;
    }
    else {
        getHTMLInputElement("sign_align_all").checked = false;
    }
    let isDisabled = !alignAll;
    changeStateOfElements(["sign_align_mode"], isDisabled);
    let radioButtons = document.querySelectorAll("#sign_align_mode_div input[type=radio]");
    for (let i = 0; i < radioButtons.length; i++) {
        if ((<HTMLInputElement>radioButtons[i]).type == "radio") {
            (<HTMLInputElement>radioButtons[i]).disabled = isDisabled;
        }
    }
}