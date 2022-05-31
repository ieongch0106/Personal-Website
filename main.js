//DOM events
// document.addEventListener('scroll', function () {
//     for (let box of document.querySelectorAll('.box')) {
//         if(isInViewport(box)) {
//             box.classList.add('fade-in-up');
//             box.style.visibility = 'visible';
//             while(box !== null) {
//                 const sibling = box.nextElementSibling;
//                 box.addEventListener('animationstart', ()=> {
//                     sibling.classList.add('fade-in-up');
//                     sibling.addEventListener('animationstart', ()=> sibling.style.visibility = 'visible');
//                 });
//                 box = sibling;
//             }
//         }
//     }
// }, {
//     passive: true
// }, {
//     once : true
// });

// function isInViewport(element) {
//     const rect = element.getBoundingClientRect();
//     return (
//         rect.top >= 0 &&
//         rect.left >= 0 &&
//         rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
//         rect.right <= (window.innerWidth || document.documentElement.clientWidth)
//     );
// }