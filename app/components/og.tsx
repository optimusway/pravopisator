export function OgImage() {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#30a46c",
        color: "#fff",
        fontSize: 32,
        fontWeight: 600,
        fontFamily: "Inter",
      }}
    >
      <h1
        style={{
          margin: 0,
          padding: 0,
          fontSize: "60px",
          lineHeight: "60px",
          fontWeight: 700,
        }}
      >
        Правописатор
      </h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          margin: 0,
          marginTop: "12px",
          paddingLeft: "24px",
          paddingRight: "24px",
          fontSize: "35px",
          lineHeight: "40px",
          fontWeight: 400,
        }}
      >
        <p
          style={{
            margin: 0,
            padding: 0,
          }}
        >
          Исправляет ошибки и опечатки,
        </p>
        <p
          style={{
            margin: 0,
            padding: 0,
          }}
        >
          расставляет запятые и знаки препинания.
        </p>
      </div>
    </div>
  );
}
