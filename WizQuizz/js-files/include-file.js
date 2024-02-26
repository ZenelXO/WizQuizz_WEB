// https://stackoverflow.com/questions/40162907/w3includehtml-sometimes-includes-twice
function IncludeFile() {
    let z, i, a, file, xhttp;

    z = document.getElementsByTagName("*");

    for (i = 0; i < z.length; i++) {
        if (z[i].getAttribute("include-file")) {
            a = z[i].cloneNode(false);
            file = z[i].getAttribute("include-file");
            xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function () {
                if (xhttp.readyState === 4 && xhttp.status === 200) {
                    a.removeAttribute("include-file");
                    a.innerHTML = xhttp.responseText;
                    z[i].parentNode.replaceChild(a, z[i]);
                    IncludeFile();
                }
            }

            // false makes the send operation synchronous, which solves a problem
            // when using this function in short pages with Chrome. But it is
            // deprecated on the main thread due to its impact on responsiveness.
            // This call may end up throwing an exception someday.

            xhttp.open("GET", file, false);
            xhttp.send();

            return;
        }
    }
}
