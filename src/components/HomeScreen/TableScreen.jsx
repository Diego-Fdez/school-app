import './HomeScreen.css';

const TableScreen = () => {
  return (
    <>
      <div class='table-wrapper'>
        <table class='fl-table'>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Cédula</th>
              <th>Grado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Diego Fernández Montero</td>
              <td>603670152</td>
              <td>Licenciatura</td>
              <td>
                <button>Ver más</button>
              </td>
            </tr>
            <tr>
              <td>Content 2</td>
              <td>Content 2</td>
              <td>Content 2</td>
              <td>Content 2</td>
            </tr>
            <tr>
              <td>Content 3</td>
              <td>Content 3</td>
              <td>Content 3</td>
              <td>Content 3</td>
            </tr>
            <tr>
              <td>Content 4</td>
              <td>Content 4</td>
              <td>Content 4</td>
              <td>Content 4</td>
            </tr>
            <tr>
              <td>Content 5</td>
              <td>Content 5</td>
              <td>Content 5</td>
              <td>Content 5</td>
            </tr>
            <tr>
              <td>Content 6</td>
              <td>Content 6</td>
              <td>Content 6</td>
              <td>Content 6</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableScreen;
