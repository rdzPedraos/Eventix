{{- define "chart.image" -}}
{{- $tag := .Values.image.tag -}}
{{- if not $tag -}}
{{- $tag = .Chart.AppVersion -}}
{{- end -}}
{{ .Values.image.repository }}:{{ $tag }}
{{- end }}
