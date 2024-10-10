export default function Teacher() {
    const teachers = [
        {id: 1, nome: "João Paulo", disciplina: "Primeiros Socorros", status: "ativo"},
        {id: 2, nome: "Mariana Lima", disciplina: "Matematica Aplicada", status: "Inativo"},
        {id: 3, nome: "Claudia Araia", disciplina: "Introdução a Logística", status: "ativo"},
    ]
    return(
        <main>
            <table className="w-2/3 border m-auto text-center">
                <thead>
                    <th>ID</th>
                    <th>NOME</th>
                    <th>DISCIPLINA</th>
                    <th>STATUS</th>
                    <th>AÇÕES</th>
                </thead>
                <tbody>
                    {
                        teachers.map((teacher) => (
                            <tr key={teacher.id}>
                                <td>{teacher.id}</td>
                                <td>{teacher.nome}</td>
                                <td>{teacher.disciplina}</td>
                                <td>{teacher.status}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </main>
    )
}