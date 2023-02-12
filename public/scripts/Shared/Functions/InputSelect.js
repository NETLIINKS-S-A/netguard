export function select(input, datas) {
    const inputSelectArray = input?.querySelector(".select_options div");
    const inputSelect = input?.querySelector("#input");
    datas.forEach((data) => {
        console.log(datas);
        inputSelectArray.innerHTML += `<div class="select_option" data-id="">${data}</div>`;
    });
    inputSelect.value = inputSelectArray.firstChild.innerText;
    const inputOptions = inputSelectArray?.querySelectorAll(".select_option");
    inputOptions?.forEach((inputOption) => {
        const inputOptionContent = inputOption.innerText;
        inputOption.addEventListener("click", () => {
            inputSelect.value = inputOptionContent;
            console.log(inputSelect.value);
        });
    });
}
