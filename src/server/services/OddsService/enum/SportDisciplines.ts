import {SportDisciplineType} from "./SportDisciplineType.js";

export const SportDisciplines = [
  {
    title: 'Piłka nożna',
    type: SportDisciplineType.Football,
    iconClass: "fa-regular fa-futbol",
    oddGroupName: "Soccer" //the-odds api
  },
  {
    title: 'Koszykówka',
    type: SportDisciplineType.Basketball,
    iconClass: "fa-solid fa-basketball",
    oddGroupName: "Basketball" //the-odds api
  },
  {
    title: 'Siatkówka',
    type: SportDisciplineType.Volleyball,
    iconClass: "fa-solid fa-volleyball",
    oddGroupName: "Volleyball" //the-odds api
  },
  {
    title: 'Hokej na lodzie',
    type: SportDisciplineType.IceHockey,
    iconClass: "fa-solid fa-hockey-puck",
    oddGroupName: "Ice Hockey" //the-odds api
  },
  {
    title: 'Tenis',
    type: SportDisciplineType.Tennis,
    iconClass: "fa-solid fa-table-tennis-paddle-ball",
    oddGroupName: "Tennis" //the-odds api
  },
  {
    title: 'Golf',
    type: SportDisciplineType.Golf,
    iconClass: "fa-solid fa-golf-ball-tee",
    oddGroupName: "Golf" //the-odds api
  },
  {
    title: 'Boks',
    type: SportDisciplineType.Boxing,
    iconClass: "fa-solid fa-mitten",
    oddGroupName: "Boxing" //the-odds api
  },
  {
    title: 'Lekkoatletyka',
    type: SportDisciplineType.Athletics,
    iconClass: "fa-solid fa-person-running",
    oddGroupName: "Athletics" //the-odds api
  },
  {
    title: 'Pływanie',
    type: SportDisciplineType.Swimming,
    iconClass: "fa-solid fa-person-swimming",
    oddGroupName: "Swimming" //the-odds api
  },
];