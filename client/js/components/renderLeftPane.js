const renderLeftPane = (user) => {
    const leftPane = document.getElementById('left-pane');

    leftPane.innerHTML = `
    <div id='personalProjectsList'>
        <p class="categoryHeading">Personal</p>
        <ul id="personalProjectsListUl">
            <li>1</li>
            <li>3</li>
            <li>2</li>
        </ul>
    </div>  

    <div id='workProjectsList'>
        <p class="categoryHeading">Work</p>
        <ul id="workProjectsListUl">
            <li>1</li>
            <li>3</li>
            <li>2</li>
        </ul>
    </div>  

    <div id='studyProjectsList'>
        <p class="categoryHeading">Study</p>
        <ul id="studyProjectsListUl">
            <li>1</li>
            <li>3</li>
            <li>2</li>
        </ul>
    </div>  

    `
}

export default renderLeftPane