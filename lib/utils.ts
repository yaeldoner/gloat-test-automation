

 async function selectFromDropDown(dropdownElements, selectedOption) {
  for await(const location of dropdownElements) {
      const elementText = await location.getAttribute("innerText");
      if (elementText === selectedOption) {
          await location.click();
          break;
      }  
  }  
}
