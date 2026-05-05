import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners'

const API = 'http://localhost:8081/v1/api/admin'

const EVAL_DEFAULT = {
    apiPath: '/v1/api/user/rating',
    accessTokenValid: true,
    authenticated: true,
    role: 'user',
    subjectUserId: 'exampleUserId',
    resourceUserId: 'exampleUserId',
    resourceType: 'rating',
    actionId: 'create',
    ratingValue: 7
}

export default function Policies() {
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const [err, setErr] = useState('')
    const [editId, setEditId] = useState(null)
    const [editBody, setEditBody] = useState('')
    const [saving, setSaving] = useState(false)

    const [evalPolicyId, setEvalPolicyId] = useState('POL_RATING_VALID_RANGE')
    const [evalJson, setEvalJson] = useState(() => JSON.stringify(EVAL_DEFAULT, null, 2))
    const [evalResult, setEvalResult] = useState(null)

    const load = useCallback(async () => {
        setErr('')
        setLoading(true)
        try {
            const token = localStorage.getItem('adminAccessToken')
            const res = await axios.get(`${API}/policies`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setList(res.data?.data || [])
        } catch (e) {
            setErr(e.response?.data?.message || e.message || 'Loi tai danh sach')
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        load()
    }, [load])

    const toggleEnabled = async (policyId, enabled) => {
        try {
            const token = localStorage.getItem('adminAccessToken')
            await axios.patch(
                `${API}/policies/${encodeURIComponent(policyId)}`,
                { enabled: !enabled },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            await load()
        } catch (e) {
            alert(e.response?.data?.message || e.message)
        }
    }

    const openEdit = async (policyId) => {
        setErr('')
        try {
            const token = localStorage.getItem('adminAccessToken')
            const res = await axios.get(
                `${API}/policies/${encodeURIComponent(policyId)}`,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            const d = res.data?.data
            setEditId(policyId)
            setEditBody(d?.body || '')
        } catch (e) {
            setErr(e.response?.data?.message || e.message)
        }
    }

    const saveBody = async () => {
        if (!editId) return
        setSaving(true)
        try {
            const token = localStorage.getItem('adminAccessToken')
            await axios.patch(
                `${API}/policies/${encodeURIComponent(editId)}`,
                { body: editBody },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            setEditId(null)
            await load()
        } catch (e) {
            alert(e.response?.data?.message || e.message)
        } finally {
            setSaving(false)
        }
    }

    const runEvaluate = async () => {
        setEvalResult(null)
        let ctx
        try {
            ctx = JSON.parse(evalJson)
        } catch {
            alert('Context JSON khong hop le')
            return
        }
        try {
            const token = localStorage.getItem('adminAccessToken')
            const res = await axios.post(
                `${API}/policies/evaluate`,
                { policyId: evalPolicyId, context: ctx },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            setEvalResult(res.data?.data)
        } catch (e) {
            setEvalResult({
                error: e.response?.data?.message || e.message
            })
        }
    }

    if (loading && list.length === 0) {
        return (
            <div className="w-full flex justify-center py-12">
                <BeatLoader color="#fc0303" />
            </div>
        )
    }

    return (
        <div className="w-full max-w-6xl mx-auto flex flex-col gap-6 pb-10 px-2 text-gray-900">
            <div>
                <h1 className="text-2xl font-bold text-[#101A33]">Chính sách XACML (MongoDB)</h1>
                <p className="text-sm text-gray-600 mt-1">
                    Bật/tắt enforcement qua PEM; chỉnh XML trong DB; demo PDP đơn giản (evaluate).
                </p>
            </div>

            {err && (
                <div className="bg-red-100 text-red-800 px-3 py-2 rounded text-sm">{err}</div>
            )}

            <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-[#101A33] text-white text-left">
                        <tr>
                            <th className="p-3">policyId</th>
                            <th className="p-3">Tiêu đề</th>
                            <th className="p-3">Bật</th>
                            <th className="p-3">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((row) => (
                            <tr key={row.policyId} className="border-t border-gray-200">
                                <td className="p-3 font-mono text-xs">{row.policyId}</td>
                                <td className="p-3">{row.title}</td>
                                <td className="p-3">
                                    <button
                                        type="button"
                                        className={`px-3 py-1 rounded text-white text-xs ${
                                            row.enabled ? 'bg-green-600' : 'bg-gray-400'
                                        }`}
                                        onClick={() => toggleEnabled(row.policyId, row.enabled)}
                                    >
                                        {row.enabled ? 'ON' : 'OFF'}
                                    </button>
                                </td>
                                <td className="p-3">
                                    <button
                                        type="button"
                                        className="text-blue-600 underline text-xs"
                                        onClick={() => openEdit(row.policyId)}
                                    >
                                        Sửa XML
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {editId && (
                <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <span className="font-semibold">Sửa body XACML — {editId}</span>
                        <button
                            type="button"
                            className="text-gray-500 text-sm"
                            onClick={() => setEditId(null)}
                        >
                            Đóng
                        </button>
                    </div>
                    <textarea
                        className="w-full min-h-[280px] font-mono text-xs border rounded p-2"
                        value={editBody}
                        onChange={(e) => setEditBody(e.target.value)}
                    />
                    <button
                        type="button"
                        disabled={saving}
                        className="self-start bg-red-600 text-white px-4 py-2 rounded text-sm disabled:opacity-50"
                        onClick={saveBody}
                    >
                        {saving ? 'Đang lưu…' : 'Lưu vào MongoDB'}
                    </button>
                </div>
            )}

            <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-3">
                <h2 className="font-semibold text-lg">Minh họa PDP (evaluate)</h2>
                <label className="flex flex-col gap-1 text-sm">
                    policyId
                    <select
                        className="border rounded px-2 py-1 max-w-md"
                        value={evalPolicyId}
                        onChange={(e) => setEvalPolicyId(e.target.value)}
                    >
                        <option value="POL_USER_AUTHENTICATED_ACCESS">
                            POL_USER_AUTHENTICATED_ACCESS
                        </option>
                        <option value="POL_ADMIN_ONLY_BACKOFFICE">
                            POL_ADMIN_ONLY_BACKOFFICE
                        </option>
                        <option value="POL_USER_OWNER_DATA_ONLY">
                            POL_USER_OWNER_DATA_ONLY
                        </option>
                        <option value="POL_RATING_VALID_RANGE">
                            POL_RATING_VALID_RANGE
                        </option>
                    </select>
                </label>
                <label className="flex flex-col gap-1 text-sm">
                    context (JSON — khớp attribute urn:netleak:* trong XML)
                    <textarea
                        className="w-full min-h-[200px] font-mono text-xs border rounded p-2"
                        value={evalJson}
                        onChange={(e) => setEvalJson(e.target.value)}
                    />
                </label>
                <button
                    type="button"
                    className="self-start bg-[#101A33] text-white px-4 py-2 rounded text-sm"
                    onClick={runEvaluate}
                >
                    Đánh giá (Permit / Deny)
                </button>
                {evalResult && (
                    <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto">
                        {JSON.stringify(evalResult, null, 2)}
                    </pre>
                )}
            </div>
        </div>
    )
}
