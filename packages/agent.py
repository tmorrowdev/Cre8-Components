from google.adk.agents import SequentialAgent

from cre8_apps.agents.ui_designer import build_ui_designer
from cre8_apps.agents.db_provisioner import build_db_provisioner
from cre8_apps.agents.code_generator import build_code_generator

root_agent = SequentialAgent(
    name="Cre8AppBuilder",
    description=(
        "Turns a natural-language UI description into a deployable Next.js app: "
        "designs cre8-wc components, provisions a Supabase schema, and generates "
        "a wired-up page.tsx."
    ),
    sub_agents=[
        build_ui_designer(),
        build_db_provisioner(),
        build_code_generator(),
    ],
)
