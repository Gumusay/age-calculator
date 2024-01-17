
import React, { useState } from "react";
import "./App.css";
import arrowIcon from "./images/icon-arrow.svg";

const App = () => {
  //Girilen inputu formdata da tut ve güncellemek için setfrom data kullan
  const [formData, setFormData] = useState({
    day: "",
    month: "",
    year: "",
  });

  //Error vermesi durumunu ele al.
  //gün, ay, yıl hatası ve genel hata için generic oluştur(örn: ileri tarih girerse hata versin)

  const [formErrors, setFormErrors] = useState({
    day: "",
    month: "",
    year: "",
    generic: "",
  });

  //sonuçları tutacak state aç 

  const [output, setOutput] = useState({
    days: "",
    months: "",
    years: "",
  });

  const hasErrors =
    formErrors.day || formErrors.month || formErrors.year || formErrors.generic;



    //datediff fonksiyonu parametre olarak tarih alır çünkü verilen tarih ile bugunun tarihi arasındaki farkı bulur
  const dateDiff = (date) => {
    date = date.split("-");  //girilen tarihi ayırırı ve gün ay yıl yapar.
  const today = new Date(); //bugünün tarihini tutan date objesi oluşturur

  //bugünün yıl,ay ve gününü tut
  const year = today.getFullYear();
  const month = today.getMonth() + 1; //indexi sıfırdan başladığı için + 1 eklenmesi gerekir
  const day = today.getDate();
  //"YYYY-MM-DD"  formatında tutmak içinde string olmaması için int çevir
  const yy = parseInt(date[0]);
  const mm = parseInt(date[1]);
  const dd = parseInt(date[2]);
  
  let years, months, days;

  months = month - mm;
  if (day < dd) {
    months = months - 1;
  }

  years = year - yy;
  if (month * 100 + day < mm * 100 + dd) {
    years = years - 1;
    months = months + 12;
  }

  days = Math.floor(
    (today.getTime() - new Date(yy + years, mm + months - 1, dd).getTime()) /
      (24 * 60 * 60 * 1000)
  );

  return { years: years, months: months, days: days };
  };

  const handleSubmit = () => {
    const dayAsNumber = Number(formData.day);
  const monthAsNumber = Number(formData.month);
  const yearAsNumber = Number(formData.year);

  // Gerekli 
  const isDayValid = dayAsNumber >= 1 && dayAsNumber <= 31;
  const isMonthValid = monthAsNumber >= 1 && monthAsNumber <= 12;
  const isYearValid = yearAsNumber >= 1;

  // Tarih 
  const today = new Date();
  const chosenDate = new Date(yearAsNumber, monthAsNumber - 1, dayAsNumber);
  const isPastDate = today - chosenDate < 0;

  // Hataları kontrol et ve setFormErrors ile güncelle
  if (!isDayValid || !isMonthValid || !isYearValid) {
    setFormErrors({
      day: isDayValid ? "" : "Gün geçerli değil",
      month: isMonthValid ? "" : "Ay geçerli değil",
      year: isYearValid ? "" : "Yıl geçerli değil",
      generic: "",
    });
  } else if (isPastDate) {
    setFormErrors({
      day: "Seçilen tarih gelecek bir tarih olamaz",
      month: "",
      year: "",
      generic: "",
    });
  } else {
    // Tüm validasyonlar geçerliyse buraya gelir
    // Sonuçları güncelleme, setOutput fonksiyonu kullanılarak sonuçlar güncellenir
    const formattedDate = `${yearAsNumber}-${monthAsNumber}-${dayAsNumber}`;
    const { years, months, days } = dateDiff(formattedDate);

    setOutput({
      days: days,
      months: months,
      years: years,
    });

    // Hata durumu, setFormErrors fonksiyonu kullanılarak hatalar temizlenir
    setFormErrors({
      day: "",
      month: "",
      year: "",
      generic: "",
    });
  }
  };

  return (
    <div className="card-container">
      <div className="inputs-container">
        {/* Gün Input */}
        <div className="input-label-container">
          <label htmlFor="day">Gün</label>
          <input
            type="number"
            placeholder="GG"
            id="day"
            min={1}
            value={formData.day}
            onChange={(e) =>
              setFormData((prevState) => ({
                ...prevState,
                day: e.target.value,
              }))
            }
          />
          {formErrors.day && <p className="error">{formErrors.day}</p>}
        </div>

        {/* Ay Input */}
        <div className="input-label-container">
          <label htmlFor="month">Ay</label>
          <input
            type="number"
            placeholder="AA"
            id="month"
            min={1}
            value={formData.month}
            onChange={(e) =>
              setFormData((prevState) => ({
                ...prevState,
                month: e.target.value,
              }))
            }
          />
          {formErrors.month && <p className="error">{formErrors.month}</p>}
        </div>

        {/* Yıl Input */}
        <div className="input-label-container">
          <label htmlFor="year">Yıl</label>
          <input
            type="number"
            placeholder="YYYY"
            id="year"
            min={1}
            value={formData.year}
            onChange={(e) =>
              setFormData((prevState) => ({
                ...prevState,
                year: e.target.value,
              }))
            }
          />
          {formErrors.year && <p className="error">{formErrors.year}</p>}
        </div>
      </div>

      {/* Hata mesajları */}
      {formErrors.generic && (
        <p className="error generic">{formErrors.generic}</p>
      )}

      {/* Divider ve Button */}
      <div className="divider-container">
        <div className="divider"></div>
        <button className="btn" onClick={handleSubmit}>
          <img src={arrowIcon} alt="arrowIcon" />
        </button>
      </div>

      {/* Sonuçları gösteren bölüm */}
      <div className="output-container">
        <h1>
          <span className="highlighted">
            {output.years === "" ? "--" : output.years}{" "}
          </span>{" "}
          {output.years === 1 ? "year" : "Yıl"}
        </h1>
        <h1>
          <span className="highlighted">
            {output.months === "" ? "--" : output.months}{" "}
          </span>{" "}
          {output.months === 1 ? "month" : "Ay"}
        </h1>
        <h1>
          <span className="highlighted">
            {output.days === "" ? "--" : output.days}{" "}
          </span>{" "}
          {output.days === 1 ? "day" : "Gün"}
        </h1>
      </div>
    </div>
  );
};

export default App;
