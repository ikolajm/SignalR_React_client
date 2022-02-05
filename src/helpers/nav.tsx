const handleDropdownToggle = (e: any) => {
    let content = document.querySelector("#dropdown-content")
    let inBounds = false;
    if (e.target.classList.contains('fa-bars')) {
        inBounds = true
    }
    if (e.target.classList.contains('dropdown-content')) {
        inBounds = true
    }
    if (e.target.classList.contains('editProfileLink')) {
        inBounds = true
    }
    if (e.target.classList.contains('logoutLink')) {
        inBounds = true
    }
    if (!inBounds) {
        content?.classList.toggle("show");
        // document.body.removeEventListener('click', handleDropdownToggle)
    }
}

const toggleDropdown = () => {
    // Add show class
    let content = document.querySelector("#dropdown-content")
    content?.classList.toggle("show");

    // Add event listener to close if click is not 'relevant'
    // document.body.addEventListener('click', handleDropdownToggle)
}

export { toggleDropdown }